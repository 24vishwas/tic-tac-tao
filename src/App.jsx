import React, { useState, useEffect } from 'react';

import Playgame from './Playgame';
// import './App.css'
import Home from './Home'
import Qoute from './Qoute'



function App() {

  const [currentPage, setCurrentPage] = useState('home');
  const [gameProps, setGameProps] = useState(null);

  useEffect(() => {
    const storedPlayerChoice = localStorage.getItem('playerChoice');

    if (storedPlayerChoice) {
      setGameProps({ playerChoice: storedPlayerChoice });
      setCurrentPage('playgame');
    }
  }, []);

  const navigateToPlayGame = (props) => {
    setGameProps(props);
    setCurrentPage('playgame');
    localStorage.setItem('playerChoice', props.playerChoice);
  };

  const resetLocalStorage = () => {
    localStorage.clear();
    setCurrentPage('home');
    setGameProps(null);
  };

  const goBackToHome = () => {
    setCurrentPage('home');
  };

  return (
    <>
    <div className='app'>
     <Qoute/>
     {/* <button onClick={resetLocalStorage}>Reset Local Storage</button> */}
     <div>
      {currentPage === 'home' && (
        <Home onPlayGameClick={navigateToPlayGame} />
      )}
      {currentPage === 'playgame' && <Playgame playerChoice={gameProps?.playerChoice} goBack={goBackToHome} presentPage={setCurrentPage}  />}
      {/* {currentPage === 'playgame' && <button onClick={goBackToHome}>Go Back to Home</button>} */}
    </div>
     </div>
    </>
  )
}

export default App
