import React, {useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import cross from './assets/cross.png'
import crossWhite from './assets/cross-white.png'
import circle from './assets/circle.png'
import circleYellow from './assets/circle-yellow.png'


// toast.configure();
function Home({ onPlayGameClick }) {
  const [selected, setSelected] = useState('x')
  const gameProps = {
    // Your props for PlayGame component
    playerChoice: selected,
    // Add more props as needed
  };
  const initialColor= '#192A32'
  const changeColor= '#D9D9D9'
  const [clicked1, setClicked1] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const handlebackground1 = () =>{
    // setBackgroundColor('#D9D9D9')
    setSelected('x')
    if(clicked1 == true){

      setClicked1(false)
    }
    else{
      setClicked1(true)
      setClicked2(false)
    }
    
  }
  const handlebackground2 = () =>{
    setSelected('o')
    if(clicked2 == true){
      setClicked2(false)
    }else{
      setClicked2(true)
      setClicked1(false)
    }
  }

  const [copied, setCopied] = useState(false);
  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast("invite link copied",{
      position: toast.POSITION.TOP_RIGHT,
      className:'toast-msg',
    }
    );
    setCopied(true);
    // toast.success("Success Notification !", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }
  return (
    <div className='home'>
      <div>

        <img style={{marginRight:'10px'}} src={cross} alt="circle" />
        <img src={circleYellow} alt="circle" />
      </div>
        <div className='pick-wrapper'>
            <h2>PICK PLAYER</h2>
            <div className='pick-icon-wrapper'>
             <div onClick={handlebackground1} style={{backgroundColor:!clicked1 ? initialColor : changeColor}} >
               <img  src={!clicked1 ? crossWhite : cross } alt="crossWhite" />
               </div>
               <div onClick={handlebackground2} style={{backgroundColor:!clicked2 ? initialColor : changeColor}}>
              <img src={!clicked2 ? circleYellow : circle } alt="circle" />
               </div>
            </div>
        </div>
        <button className='button'  onClick={() => onPlayGameClick(gameProps)} style={{backgroundColor:'#F2B237'}}>NEW GAME (VS CPU)</button>
        <button className='button' style={{backgroundColor:'#32C4C3'}}>NEW GAME ( VS HUMAN ) Coming soon</button>
        <button onClick={copy} className='button button1' style={{backgroundColor:'#F2B237'}}>Invite your friend
        {!copied ? "Copy link" : "Copied!"}
        </button>
    </div>
  )
}

export default Home