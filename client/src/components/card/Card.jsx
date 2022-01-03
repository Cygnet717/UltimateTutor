import React from 'react';
import './Card.css'
import cardImage from '../../images/Magic_card_back.jpg'

export default function Card() {
    return (
        <div className="snigleCard">
            <p>Card Name</p>
            <img className='cardImage' src={cardImage}/>
        </div>
    )
}