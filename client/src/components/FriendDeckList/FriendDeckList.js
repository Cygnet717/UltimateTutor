import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { sortCardTypes } from '../../utils/deckApi';

export default function FriendDeckList(props){
  const [ sortedCards, setSortedCards ] = useState()

  const sortDeckCards = async () => {
    const sorted = await sortCardTypes(props.deck)
    setSortedCards(sorted)
  }

  useEffect(() => {
    sortDeckCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
     {sortedCards?sortedCards.filter(type => Object.values(type)[0].length > 0)
      .map(type => {
        return(
          <div key={uuidv4()}> 
            <h4> {Object.keys(type)[0]} ({Object.values(type)[0].length})</h4>
            <ul>
              {Object.values(type)[0].map(card => 
                <li 
                  key={uuidv4()} 
                  
                >
                  {card.cardName}
                  
                </li>
              )}
            </ul>
          </div>
        )
      })
      :
      <></>
      }
    </>
  )
}