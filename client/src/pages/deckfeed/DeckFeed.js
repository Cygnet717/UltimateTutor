import React from 'react';
import {useState, useEffect, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext"
import {useParams} from 'react-router-dom';
import './DeckFeed.css';

export default function DeckFeed() {
  const {deck_id} = useParams()
  const {userDecks} = useContext(AuthContext)
  const [deckData, setDeckData]= useState()
  const [sortedCards, setSortedCards]= useState()
  // hover on card name and see image of card? or just clickable to show modal image of card?

  const getDetails = async(deck_id) => {
    const currentDeck = userDecks.find(deck => deck._id === deck_id)
    if(currentDeck){
      let deckCreatures = [];
      let deckLands = [];
      let deckInstants = [];
      for(let i=0; i<currentDeck.deckCards.length; i++){
        switch(currentDeck.deckCards[i].cardType) {
          case "creature":
            deckCreatures.push(currentDeck.deckCards[i])
            break;
          case 'land':
            deckLands.push(currentDeck.deckCards[i])
            break;
          case 'instant':
            deckInstants.push(currentDeck.deckCards[i])
            break;
          default:
            // code block
        }
      }
      setSortedCards({creatures: deckCreatures, lands:deckLands, instants:deckInstants})
      setDeckData(currentDeck)
      console.log(currentDeck)
      console.log(sortedCards)

    }
   
  }

  useEffect(() => {
    getDetails(deck_id)
  }, [userDecks])
  return (
    <div>
      {deckData? 
      <>
      <h1>{deckData.deckName}</h1>
      <div className='leftSideDeck'>
        <div>
          Format: {deckData.format}
        </div>
        <div>
          Commander: if applicable
        </div>
        {/* <div>
          {deckData.versionToBe?
            <>
            Version When Saved: {deckData.versionToBe}
            </>
            :
            <>
            Version: {deckData.version}
            </>
          } 
        </div> 
        <div>
          (if versioned) Wins/Losses:  3W/4L
        </div> removed to narrow mvp scope  */}
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
      </> 
        : 
        <></>
      }
      
    </div>
  )
}