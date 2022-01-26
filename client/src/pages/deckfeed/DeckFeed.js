import React from 'react';
import {useState, useEffect, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext"
import {useParams} from 'react-router-dom';
import cardImage from '../../images/Magic_card_back.jpg'
import { toggleCommander } from '../../utils/deckApi';
import { v4 as uuidv4 } from 'uuid';
import './DeckFeed.css';

export default function DeckFeed() {
  const {deck_id} = useParams()
  const {userDecks} = useContext(AuthContext)
  const [deckData, setDeckData]= useState()
  const [sortedCards, setSortedCards]= useState([{Creatures: []}, {Instants: []}, {Sorceries:[]}, {Enchantments: []}, {Lands: []}, {Planeswalkers: []}, {Artifacts: []}])
  const [displayedCard, setDisplayedCard] = useState(cardImage)
  const [commanderCard, setCommanderCard] = useState()



  const getDetails = async(deck_id) => {
    const currentDeck = userDecks.find(deck => deck._id === deck_id)
    
    if(currentDeck){  //['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Land', 'Planeswalker', 'Artifact']
      let deckCreatures = [];
      let deckInstants = [];
      let deckSorceries = [];
      let deckEnchantments = [];
      let deckLands = [];
      let deckPlaneswalkers = [];
      let deckArtifacts = [];

      for(let i=0; i<currentDeck.deckCards.length; i++){
        switch(currentDeck.deckCards[i].cardType) {
          case "Creature":
            deckCreatures.push(currentDeck.deckCards[i])
            break;
          case 'Instant':
            deckInstants.push(currentDeck.deckCards[i])
            break;
          case 'Sorcery':
            deckSorceries.push(currentDeck.deckCards[i])
            break;
          case 'Enchantment':
            deckEnchantments.push(currentDeck.deckCards[i])
            break; 
          case 'Land':
            deckLands.push(currentDeck.deckCards[i])
            break;
          case 'Planeswalker':
            deckPlaneswalkers.push(currentDeck.deckCards[i])
            break;
          case 'Artifact':
            deckArtifacts.push(currentDeck.deckCards[i])
            break;
          default:
            break;
        }
      }
      setSortedCards([
        {Creatures: deckCreatures}, 
        {Instants: deckInstants}, 
        {Sorceries: deckSorceries},
        {Enchantments: deckEnchantments},
        {Lands: deckLands},
        {Planeswalkers: deckPlaneswalkers},
        {Artifacts: deckArtifacts}
      ])
      setDeckData(currentDeck)
      const commCard = currentDeck.deckCards.find(card => card.commander)
      if(commCard){
        setCommanderCard(commCard)
        setDisplayedCard(commCard.image.front)
      }
      
    }

  }

  const handleCommanderSelect = async (event) => {
    const commanderData = {
      deck_id: deckData._id,
      card_id: event.target.value,
      commander: true
    }
    const selectedCard = event.target[event.target.selectedIndex]
    const cardName = selectedCard.getAttribute('data-name')
    toggleCommander(commanderData)
    setCommanderCard({cardName})
    setDisplayedCard(selectedCard.getAttribute('data-image'))
  }

  useEffect(() => {
    getDetails(deck_id)

  }, [userDecks])
  return (
    <div id='deckListContainer'>
      {deckData? 
      <>
      <div className='leftSideDeck'>
        <h1>{deckData.deckName}</h1>
        
        {deckData.format === 'Commander'?
          <div>
            Commander: {
              commanderCard ? 
              commanderCard.cardName 
              : 
              <select onChange={handleCommanderSelect}>
                <option>select a commander</option>
                 {deckData.deckCards.map(card => 
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
        </div> removed to narrow mvp scope  */}
        <img id='displayedCard' src={displayedCard} alt='current card' />
      </div>
      <div className='rightSideDeck'>
        {sortedCards.map(type => {
          if(Object.values(type)[0].length > 0){
            return(
              <div key={uuidv4()}> 
                <h4> {Object.keys(type)[0]} ({Object.values(type)[0].length})</h4>
                <ul>
                  {Object.values(type)[0].map(card => 
                    <li key={uuidv4()} onMouseOver={() => setDisplayedCard(card.image.front)} onMouseLeave={() => commanderCard? setDisplayedCard(commanderCard.image.front): console.log('no commander')}>{card.cardName}</li>
                  )}
                </ul>
              </div>
            )
          }
        })}
      </div>
      </> 
        : 
        <></>
      }
    </div>
  )
}