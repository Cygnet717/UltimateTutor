import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { sortCardTypes } from '../../utils/deckApi';

export default function FriendDeckList(props){
  const [ sortedCards, setSortedCards ] = useState()
  console.log(sortedCards)

  const sortDeckCards = async () => {
    console.log('this')
    const sorted = await sortCardTypes(props.deck)
    setSortedCards(sorted)
    console.log(sorted)

  }

  useEffect(() => {
    sortDeckCards()
  }, [])

  return (
    <>
     {sortedCards?sortedCards.map(type => {
          if(Object.values(type)[0].length > 0){
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
          }
          return
        })
      :
      <></>
      }
    </>
  )
}