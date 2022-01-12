import React from 'react';
import './Card.css'
import cardImage from '../../images/Magic_card_back.jpg'

export default function Card(props) {
  let frontSideImage = cardImage;
  let backSideImage = cardImage;
  let isDoubleSided = false;
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
  return (
    <div className="singleCard">
      <p>{props.cardData? props.cardData.name : "Card Name"}</p>
      {isDoubleSided? 
        <img className='cardImage' alt={props.cardData? props.cardData.name : "Card Name"} src={frontSideImage} onClick={e => flipCard(e)}/>
        :
        <img className='cardImage' alt={props.cardData? props.cardData.name : "Card Name"} src={frontSideImage}/>
      }
      {props.loggedIn ? 
        <form>
          <select>
            <option>Pick Deck</option>
            <option>deck 1</option>
            <option>deck 2</option>
            <option>deck 3</option>
          </select>
          <button>Add</button>
        </form>
        :
        <>Login to build decks</>
      }

    </div>
  )
}