import './App.css'
import {useEffect, useState} from 'react';
import Card from './components/Card';

//creates object of cards with direct src value 
const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {

  //useState values to change in future code
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //handles setting the card choices
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare 2 selected Cards. useEffect used due to negate synchronize functionality
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      //if selected cards matched we take most current value of card and return a new
      //set of the same cards except this card has a value of matched
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched:true}
            } else{
              return card
            }
          })
        })
        resetTurns()
        
      } else {
        //takes callback method and time in miliseconds
        setTimeout(() => resetTurns(), 1000)
        
      }
      
    }
    //dependant on choiceOne or choiceTwo changing in value
  }, [choiceOne, choiceTwo])

  //reset choices and increase turn
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    //allows for value of previous turn 
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  }

  //shuffle cards
  const shuffleCards = () => {
    //creates spreads 6 objects twice to have an array of 12 objects with half being the same
    const shuffledCards = [...cardImages, ...cardImages]
    //for each card object it either switches its place or stays 
    .sort(() => Math.random() - 0.5)
    //itereates through each card object spreading its contents into a new object with an id
    .map((card) => ({...card, id:Math.random()}));



    //sets new value of cards to the created shuffled cards, resets choices and turns
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards)
    setTurns(0);
  }

  useEffect(() => shuffleCards(),[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick = {shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => <Card 
        key = {card.id} 
        card={card} 
        handleChoice = {handleChoice} 
        //if card equals to choice one or two or matched then it is flipped
        flipped = {card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}/>)}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App