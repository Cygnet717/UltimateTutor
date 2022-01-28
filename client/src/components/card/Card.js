import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Alert from 'react-bootstrap/Alert';
import { addCardToDeck, getUserDecks } from '../../utils/deckApi';
import cardImage from '../../images/Magic_card_back.jpg';
import './Card.css';


export default function Card(props) {
  const {setUserDecks, user} = useContext(AuthContext)
  const [showConf, setShowConf] = useState(false)
  // const [currentDeck, setCurrentDeck] = useState()
  

  let frontSideImage = cardImage;
  let backSideImage = cardImage;
  let isDoubleSided = false;
  let isSideboard = false;

  if(props.cardData){
    if(props.cardData.image_uris){
      frontSideImage = props.cardData.image_uris.normal
    }else{
      isDoubleSided = true;
      frontSideImage = props.cardData.card_faces[0].image_uris.normal;
      backSideImage = props.cardData.card_faces[1].image_uris.normal;
    }
  }

  function flipCard (e){
    let currentImage = e.currentTarget.src
    if(currentImage === frontSideImage){
      e.currentTarget.src = backSideImage
    } else {
      e.currentTarget.src = frontSideImage
    }
  }

  const handleChangeSelected = async(event) => {
    const constructingDeckData = {
      deck_id: event.target.value,
      deckName: event.target[event.target.selectedIndex].getAttribute('data-deckname')
    }
    props.setConstructingDeck(constructingDeckData)
  }

  const getCardType = (type_line) => {
    const types = ['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Land', 'Planeswalker', 'Artifact']
    let cardType =''

    for(let i=0; i<types.length; i++){
        if(type_line.includes(types[i])){
          cardType = types[i];
          break;  //controlling for Artifact Creatures and Enchantment Creatures and exiting when type is matched
        }
    }
    return cardType
  }

  const handleAddToDeck = async(event, cardData) => {
    event.preventDefault()
    const finalType = await getCardType(cardData.type_line)
    let newCardData = {
      cardName: cardData.name,
      deck_id: props.constructingDeck.deck_id,
      image: {front: frontSideImage, back: backSideImage},
      cardType: finalType,
      commander: false,
      sideBoard: isSideboard
    }
    const updatedDeck = await addCardToDeck(newCardData)
    const response = await getUserDecks(user.data._id)
    const result = await response.json()
    setUserDecks(result)
    setShowConf(true)
  }

  const handleSideboardCheck = () => {
    isSideboard = !isSideboard
  }

  return (
    <div className="singleCard">
      <p>{props.cardData? props.cardData.name : "Card Name"}</p>
      {showConf ? 
        <Alert style={{position: 'absolute', marginTop: '25px'}} variant='success' onClose={() => setShowConf(false)} dismissible>{props.cardData.name} added to {props.constructingDeck.deckName}</Alert>
        :
        <></>
      }

      {isDoubleSided? 
        <img className='cardImage' alt={props.cardData? props.cardData.name : "Card Name"} src={frontSideImage} onClick={e => flipCard(e)}/>
        :
        <img className='cardImage' alt={props.cardData? props.cardData.name : "Card Name"} src={frontSideImage}/>
      }
      {props.loggedIn ? 
        <form onSubmit={(e) => handleAddToDeck(e, props.cardData)}>
          <select onChange={handleChangeSelected}  value={props.constructingDeck.deck_id}>
            <option>Pick Deck</option>
            {props.deckData.map( deck =>
              <option value={deck._id} data-deckname={deck.deckName} key={deck._id}>{deck.deckName}</option>
            )}
          </select>
          <label htmlFor='sideboard'>
            Sideboard
            <input type='checkbox' id='sideboard' name='sideboard' value='sideboard: true' onChange={handleSideboardCheck}></input>
          </label>
          <button type='submit'>Add</button>
        </form>
        :
        <>Login to build decks</>
      }

    </div>
  )
}