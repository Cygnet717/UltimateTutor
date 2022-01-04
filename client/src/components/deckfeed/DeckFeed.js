import React from 'react';
import './DeckFeed.css'

export default function DeckFeed() {
  // hover on card name and see image of card? or just clickable to show modal image of card?
  return (
    <div className="container">
      <h1>DeckName</h1>
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