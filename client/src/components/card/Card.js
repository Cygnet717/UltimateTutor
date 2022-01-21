import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import './Card.css'
import { addCardToDeck, getUserDecks } from '../../utils/deckApi';
import cardImage from '../../images/Magic_card_back.jpg'


export default function Card(props) {
  const {setUserDecks, user} = useContext(AuthContext)

  let frontSideImage = cardImage;
  let backSideImage = cardImage;
  let isDoubleSided = false;
  let isSideboard = false;
  let selectedDeckId = 0;

  if(props.cardData){
    if(props.cardData.image_uris){
      frontSideImage = props.cardData.image_uris.small
    }else{
      isDoubleSided = true;
      frontSideImage = props.cardData.card_faces[0].image_uris.small;
      backSideImage = props.cardData.card_faces[1].image_uris.small;
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
    selectedDeckId = event.target.value
  }

  const handleAddToDeck = async(event, cardData) => {
    event.preventDefault()
    let newCardData = {
      cardName: cardData.name,
      deck_id: selectedDeckId,//image
      image: {front: frontSideImage, back: backSideImage},
      cardType: cardData.type_line,
      commander: false,
      sideBoard: isSideboard
    }
    const updatedDeck = await addCardToDeck(newCardData)
    const response = await getUserDecks(user.data._id)
    const result = await response.json()
    console.log(result)
    setUserDecks(result)
    console.log(`adding ${newCardData.cardName} to ${newCardData.deck_id}`)
    //flash added confirmation "cardname added to deckname"
  }

  const handleSideboardCheck = () => {
    isSideboard = !isSideboard
  }

  return (
    <div className="singleCard">
      <p>{props.cardData? props.cardData.name : "Card Name"}</p>
      {isDoubleSided? 
        <img className='cardImage' alt={props.cardData? props.cardData.name : "Card Name"} src={frontSideImage} onClick={e => flipCard(e)}/>
        :
        <img className='cardImage' alt={props.cardData? props.cardData.name : "Card Name"} src={frontSideImage}/>
      }
      {props.loggedIn ? 
        <form onSubmit={(e) => handleAddToDeck(e, props.cardData)}>
          <select onChange={handleChangeSelected}>
            <option>Pick Deck</option>
            {props.deckData.map( deck =>
              <option value={deck._id} key={deck._id}>{deck.deckName}</option>
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