import React from 'react';
import './Card.css'
import cardImage from '../../images/Magic_card_back.jpg'

export default function Card() {
    return (
        <div className="container">
            <h4>Card Name</h4>
            <img src={cardImage}/>
        </div>
    )
}