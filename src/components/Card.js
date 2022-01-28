import {useState} from 'react';
import "./Card.css"

export default function Card({card, handleChoice, flipped, disabled}) {

  //what click event does
  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)}
    
  }
  
  
  //creates card template
  return <div className="card">
      <div className={flipped? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front"/>
        <img src="/img/cover.png" className="back" alt="cardBack" onClick={handleClick}/>  
      </div>
    </div>
  
}
