import React from 'react'

export const Popup = ({ isOpen, onClose, children, quit, resetBoard }) => {
  return (
    isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            {children}
            <button style={{backgroundColor:'#31C4BE'}} className="close-button" onClick={onClose}>
              PLAY AGAIN
            </button>
            <button className='close-button' onClick={() => { resetBoard() }}>reset</button>
            <button className='close-button' style={{backgroundColor:'#F2B237'}} onClick={quit}>QUIT</button>
          </div>
        </div>
      )
  )
}
