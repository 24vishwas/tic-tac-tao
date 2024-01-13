import React from 'react'
import { useState,useEffect } from 'react'
import { Popup } from './Popup'


import cross from './assets/cross.png'
import crossWhite from './assets/cross-white.png'
import circle from './assets/circle.png'
import circleYellow from './assets/circle-yellow.png'
import retry from './assets/pajamas_retry.svg'

function Playgame(props) {

  console.log(props)
  // const board= {
  //   1:null,
  //   2:null,
  //   3:null,
  //   4:null,
  //   5:null,
  //   6:null,
  //   7:null,
  //   8:null,
  //   9:null
  // }
  const [board, setBoard] = useState(Array(9).fill(''));
  // console.log(props.playerChoice)
  const [turn, setTurn] = useState(props.playerChoice)
  const [userScore, setUserScore] = useState(parseInt(localStorage.getItem('userScore')) || 0);
  const [cpuScore, setCpuScore] = useState(parseInt(localStorage.getItem('cpuScore')) || 0);
  const [drawScore, setDrawScore] = useState(parseInt(localStorage.getItem('drawScore')) || 0);
  const [userWin, setUserWin] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('userScore', userScore.toString());
    localStorage.setItem('cpuScore', cpuScore.toString());
    localStorage.setItem('drawScore', drawScore.toString());
  }, [userScore, cpuScore, drawScore]);
  
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(''));
  };
  const cpuChoice = () => {
    if (turn == 'x') {
      return 'o'
    } if (turn == 'o') {
      return 'x'
    }
  }
  const getWinnerScore = (result) => {
    if (result == cpuChoice()) {
      let score = cpuScore + 1
      setCpuScore(score);
      resetBoard()
    } else {
      let score = userScore + 1
      setUserScore(score);
      setUserWin(true)
      resetBoard()
    }
    console.log(userScore)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const resetScores =()=>{
    setUserScore(0);
     setCpuScore(0);
     setDrawScore(0);
    //  props.goBack();
   }

   
  const goback = () =>{
    {resetScores();
props.goBack();}
    
  }

  const makeComputerMove = (currentBoard) => {
    // Generate a random index representing an empty square

    let randomIndex;

    while (currentBoard[randomIndex] !== "") {
      let noEmptyStrings = currentBoard.every(item => item !== '');
      if (noEmptyStrings) {
        console.log('its draw')
        let score = drawScore +1
        setDrawScore(score)
        resetBoard()
        break
      } else {
        randomIndex = Math.floor(Math.random() * 9);
      }
    }

    // Update the board with the computer's move
    currentBoard[randomIndex] = cpuChoice();
    console.log(turn)
    return currentBoard
    // Update the state with the new board and toggle the player
    // setBoard(currentBoard);
  }


  const handleClick = (tileNumber) => {
    // if(turn == 'x'){
    //   setTurn('o')
    // }else setTurn('x')

    if (board[tileNumber] != '') {
      // setClicked(false)
      return setBoard((prevBoard) => {

        const newBoard = [...prevBoard];
        newBoard[tileNumber] = '';
        // console.log(board) 
        return newBoard;
      });
    }
    else {
      // setClicked(true)
      return setBoard((prevBoard) => {

        const newBoard = [...prevBoard];
        newBoard[tileNumber] = props.playerChoice;
        let winner = calculateWinner(newBoard);
        if (winner) {
          console.log('winner', winner)
          getWinnerScore(winner)
          return newBoard
        } else {

          const latestBoard = makeComputerMove(newBoard)
          winner = calculateWinner(latestBoard);
          if (winner) {
            getWinnerScore(winner)
            return latestBoard
          }
          // return newBoard;
          return latestBoard
        }
      });
    }
  }
  console.log(board)

  return (


    <div className='game home container' style={{ backgroundColor: isPopupOpen || userWin   ? 'black' : '#192A32' }}>
      {

        (userWin) && (
          <div className='win-card'>
            <p style={{ color: 'white' }}>YOU WON!</p>
            <div style={{ color: props.playerChoice == 'x' ? '#31C4BE' : '#F2B237', fontSize: '24px' }}>
              {(props.playerChoice == 'x') ? <img src={cross} alt="" /> : <img src={circleYellow} alt="" />}
              TAKES THE ROUND
            </div>
            <div>
              <button onClick={() => goback()} style={{ backgroundColor: '#F2B237' }} className='btn'>QUIT</button>
              <button onClick={() => setUserWin(false)} style={{ backgroundColor: '#31C4BE' }} className='btn'>NEXT ROUND</button>
            </div>
          </div>)
      }
       <Popup isOpen={isPopupOpen} onClose={closePopup} quit = {goback} resetBoard= {resetScores}  >
        <h2 style={{color:'#F2B237'}}>Do you want to quit ?</h2>
        
      </Popup>
      {
        !(userWin) && (
          <>
          
            <div>
              <img src={cross} alt="" />
              <img src={circleYellow} alt="" />
            </div>
            <div className='navbar'>
              <div className='turn'>
                {(turn == 'x') ? <img src={cross} alt="" /> : <img src={circleYellow} alt="" />}
                {/* <img src={props.playerChoice} alt="" /> */}
                <p>TURN</p>
              </div>
              <div onClick={openPopup} className='exit'>
                <img src={retry} alt="" />
              </div>
            </div>
            <div className='grid-btn'>
              <div onClick={() => { handleClick(0) }} className='tile' id='0'>

                {board[0] === 'x' && <img src={cross} alt="X" />}
                {board[0] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(1) }} className='tile' id='1'>

                {board[1] === 'x' && <img src={cross} alt="X" />}
                {board[1] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(2) }} className='tile' id='2'>

                {board[2] === 'x' && <img src={cross} alt="X" />}
                {board[2] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(3) }} className='tile' id='3'>

                {board[3] === 'x' && <img src={cross} alt="X" />}
                {board[3] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(4) }} className='tile' id='4'>

                {board[4] === 'x' && <img src={cross} alt="X" />}
                {board[4] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(5) }} className='tile' id='5'>

                {board[5] === 'x' && <img src={cross} alt="X" />}
                {board[5] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(6) }} className='tile' id='6'>

                {board[6] === 'x' && <img src={cross} alt="X" />}
                {board[6] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(7) }} className='tile' id='7'>

                {board[7] === 'x' && <img src={cross} alt="X" />}
                {board[7] === 'o' && <img src={circleYellow} alt="O" />}

              </div>

              <div onClick={() => { handleClick(8) }} className='tile' id='8'>

                {board[8] === 'x' && <img src={cross} alt="X" />}
                {board[8] === 'o' && <img src={circleYellow} alt="O" />}

              </div>
            </div>
            <div className='score-board'>
              <div style={{ backgroundColor: props.playerChoice == 'x' ? '#31C4BE' : '#F2B237' }} className='userScore board'>
                {props.playerChoice} (YOU)
                <p>{userScore}</p>
              </div>
              <div className='drawScore board' >
                TIES
                <p>{drawScore}</p>
              </div>
              <div style={{ backgroundColor: props.playerChoice == 'o' ? '#31C4BE' : '#F2B237' }} className='cpuScore board'>
                {cpuChoice()} (CPU)
                <p>{cpuScore}</p>

              </div>
            </div>
            <button onClick={resetScores}></button>

          </>
        )
      }
      {/* <button onClick={() => props.goBack()}>goback</button> */}
    </div>
  )
}

export default Playgame