import React, { useContext } from 'react';
import {v4 as uuid} from 'uuid'
import './DeskFeed.css';
import {AuthContext} from "../../context/AuthContext"

export default function DeskFeed() {
  const {userDecks} = useContext(AuthContext)
  console.log(userDecks)
  return (
    <div className="container">
      {userDecks.map(deck => {
        let date = new Date(deck.dateStarted).toLocaleDateString()
        let commander = deck.deckCards.find(card => card.commander )
        return(
          <div className='singleDeck' key={uuid()}>
            <div className='deckSection'>
              <h4>{deck.deckName}</h4>
              <div>Card Count: {deck.deckCards.length}</div>
              <div>Side Board: {deck.sideBoard.length}</div>
              <div>Version: {deck.versionToBe -1}</div>
            </div>
            <div className='deckSection'>
              <div>Date Created: {date}</div>
              {deck.format == 'commander'?
                (
                  <p>Commander: {commander.cardName}</p>
                ):(
                  <p>other</p>
                )
              }
            </div>
          </div>
        )
      })}
      <div className='singleDeck'>
        <h3>New Deck +</h3>
      </div>
    </div>
  )
}