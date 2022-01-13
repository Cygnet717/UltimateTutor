import React from 'react';
import {useState, useEffect} from 'react'
import {getDeck} from '../../utils/deckApi'
import {useParams} from 'react-router-dom';
import './DeckFeed.css';

export default function DeckFeed() {
  const {deck_id} = useParams
  const [deckData, setDeckData]= useState()
  
  console.log(deck_id)
  // hover on card name and see image of card? or just clickable to show modal image of card?

  const getDetails = async(deck_id) => {
    let response = await getDeck(deck_id);
    let deckData = await response.json()
    setDeckData(deckData)
  }

  useEffect(() => {
    getDetails(deck_id)
  }, [])
  return (
    <div>
      <h1>{deckData.deckName}</h1>
      <div className='leftSideDeck'>
        <div>
          Format: renderFormatHere
        </div>
        <div>
          Commander: if applicable
        </div>
        <div>
          Version: <button>Save this Version</button> or Version#
        </div>
        <div>
          (if versioned) Wins/Losses:  3W/4L
        </div>
      </div>
      <div className='rightSideDeck'>
        <h3>Deck List</h3>
        <div> 
          <h4>Creatures (number)</h4>
          <ul>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
          </ul>
        </div>
        <div>
          <h4>Sorcery (number)</h4>
          <ul>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
          </ul>
        </div>
        <div>
          <h4>Instant (number)</h4>
          <ul>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
          </ul>
        </div>
        <div>
          <h4>Enchantment (number)</h4>
          <ul>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
          </ul>
        </div>
        <div>
          <h4>Land (number)</h4>
          <ul>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
          </ul>
        </div>
        <div>
          <h4>Sideboard (number)</h4>
          <ul>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
            <li>Card Name -- colors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}