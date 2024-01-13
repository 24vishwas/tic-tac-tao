import React, { useState, useEffect } from 'react'
import './App.css'
import eclipse from './assets/Ellipse 1.png';
import square from './assets/Group 3.png';
// import React, { useState, useEffect } from 'react';


function Qoute() {

    const [slip, setSlip] = useState({ id: null, advice: '' });

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const result = await response.json();
      setSlip(result.slip);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set up interval to refresh data every 1 minute (60000 milliseconds)
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount
console.log(slip.id)



  return (
    <div className='qoute'>
        <h1>Quote #{slip.id}</h1>
        <p>{slip.advice}</p>
        <div className='qoute-image'>
        <img src={eclipse} className='ellipse' alt="alternative" />
        <img src={square} className='square' alt="alternative" />

        </div>
    </div>
  )
}

export default Qoute