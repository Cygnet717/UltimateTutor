import React from 'react';
import {useState, useEffect, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext"
import {useParams} from 'react-router-dom';
import cardImage from '../../images/Magic_card_back.jpg'
import { toggleCommander, removeCard, sortCardTypes } from '../../utils/deckApi';
import { v4 as uuidv4 } from 'uuid';
import './DeckFeed.css';

export default function DeckFeed() {
  const {deck_id} = useParams()
  const {userDecks} = useContext(AuthContext)
  const [deckData, setDeckData]= useState()
  const [sortedCards, setSortedCards]= useState([{Creatures: []}, {Instants: []}, {Sorceries:[]}, {Enchantments: []}, {Lands: []}, {Planeswalkers: []}, {Artifacts: []}])
  const [displayedCard, setDisplayedCard] = useState(cardImage)
  const [commanderCard, setCommanderCard] = useState()
  const [editing, setEditing] = useState(false) //visible hidden

  const getDetails = async(deck_id) => {
    const currentDeck = userDecks.find(deck => deck._id === deck_id)
    
    handleSortCards(currentDeck)
  }

  const handleSortCards = async(currentDeck) =>{
    let sortedResult;
    if(currentDeck){
      sortedResult = await sortCardTypes(currentDeck)
    
      setSortedCards(sortedResult)
      setDeckData(currentDeck)
      if(currentDeck.commander){
        setCommanderCard(currentDeck.commander)
        setDisplayedCard(currentDeck.commander.image.front)
      }else{
        setDisplayedCard(currentDeck.deckCards[0].image.front)
      }
    }
      
    
  }

  const handleCommanderSelect = async (event) => {
    const card_id = event.target.value
    const selectedCard = deckData.deckCards.find(card => card._id === card_id)
    
    setCommanderCard(selectedCard)
    setDisplayedCard(selectedCard.image.front)
    const commanderData = {
      deck_id: deckData._id,
      cardData: selectedCard
    }
   
    const res = await toggleCommander(commanderData)
    return res
  }

  const handleRemoveCard = async (e) => {
    const cardData ={
      deck_id,
      card_id: e.currentTarget.dataset.card_id,
      sideBoard: e.currentTarget.hasAttribute('data-sideboard')
    }
    const response = await removeCard(cardData)
    const result = await response.json()
    await handleSortCards(result) //update page
  }

  useEffect(() => {
    getDetails(deck_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDecks])
  return (
    <div id='deckListContainer'>
      {deckData? 
      <>
      <div className='leftSideDeck'>
        <h1>{deckData.deckName}</h1>
        {editing?
          <i className="far fa-save" onClick={() =>setEditing(false)}></i>
          :
          <i className="far fa-edit" onClick={() =>setEditing(true)}></i>
        }
        {deckData.format === 'Commander'?
          <div>
            Commander: {commanderCard && !editing ? 
              commanderCard.cardName 
              : 
              <select onChange={handleCommanderSelect} value={commanderCard? commanderCard._id : ''}>
                <option >select a commander</option>
                 {sortedCards[0].Creatures.map(card => 
                   <option key={uuidv4()} data-image={card.image.front} data-name={card.cardName} value={card._id}>{card.cardName}</option>
                 )}
                 {sortedCards[5].Planeswalkers.map(card => 
                   <option key={uuidv4()} data-image={card.image.front} data-name={card.cardName} value={card._id}>{card.cardName}</option>
                 )}
              </select>
              }
          </div>
          :
          <div>
            Format: {deckData.format}
          </div>
        }
        
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
        </div> removed to narrow mvp scope  
        */}
        <img id='displayedCard' src={displayedCard} alt='current card' />
      </div>
      <div className='rightSideDeck'>
        {sortedCards.filter(type => Object.values(type)[0].length > 0)
          .map(type => {
            return(
              <div key={uuidv4()}> 
                <h4> {Object.keys(type)[0]} ({Object.values(type)[0].length})</h4>
                <ul>
                  {Object.values(type)[0].map(card => 
                    <li 
                      key={uuidv4()} 
                      onMouseOver={() => setDisplayedCard(card.image.front)} 
                      onMouseLeave={() => commanderCard? setDisplayedCard(commanderCard.image.front): console.log('no commander')}
                    >
                      {card.cardName}
                      <i 
                        className="fas fa-times" 
                        style={editing? {visibility: 'visible'} : {visibility: 'hidden'}}
                        data-card_id={card._id} 
                        onClick={handleRemoveCard}>
                      </i>
                    </li>
                  )}
                </ul>
              </div>
            )
        })}
        <div>
          <h4>Sideboard</h4>
          <ul>
            {deckData.sideBoard.map(card =>
              <li 
              key={uuidv4()} 
              onMouseOver={() => setDisplayedCard(card.image.front)} 
              onMouseLeave={() => commanderCard? setDisplayedCard(commanderCard.image.front): console.log('no commander')}
              >
                {card.cardName}
                <i 
                  className="fas fa-times" 
                  style={editing? {visibility: 'visible'} : {visibility: 'hidden'}}
                  data-card_id={card._id} 
                  data-sideboard 
                  onClick={handleRemoveCard}>
                </i>
              </li>
              )}
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