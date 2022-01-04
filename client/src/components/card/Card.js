import React from 'react';
import './Card.css'
import cardImage from '../../images/Magic_card_back.jpg'

export default function Card() {
  return (
    <div className="snigleCard">
      <p>Card Name</p>
      <img className='cardImage' src={cardImage}/>
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
}