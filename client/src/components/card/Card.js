import React from 'react';
import './Card.css'
import cardImage from '../../images/Magic_card_back.jpg'

export default function Card(props) {
  let frontSideImage = cardImage;
  let backSideImage = cardImage;
  if(props.cardData){
    if(props.cardData.image_uris){
      frontSideImage = props.cardData.image_uris.small
    }else{
      frontSideImage = props.cardData.card_faces[0].image_uris.small;
      backSideImage = props.cardData.card_faces[1].image_uris.small;
    }
  }
  return (
    <div className="singleCard">
      <p>{props.cardData? props.cardData.name : "Card Name"}</p>
      <img className='cardImage' alt={props.cardData? props.cardData.name : "Card Name"} src={frontSideImage}/>
      <form>
        <select>
          <option>Pick Deck</option>
          <option>deck 1</option>
          <option>deck 2</option>
          <option>deck 3</option>
        </select>
        <button>Add</button>
      </form>

    </div>
  )
}//props.cardData? props.cardData.image_uris.normal : 
//