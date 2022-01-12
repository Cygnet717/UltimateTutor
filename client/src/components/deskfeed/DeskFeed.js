import React, { useContext, useState } from 'react';
import {v4 as uuid} from 'uuid';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {AuthContext} from "../../context/AuthContext";
import {createDeck} from '../../utils/deckApi';
import './DeskFeed.css';

export default function DeskFeed() {
  const {user} = useContext(AuthContext)
  const {userDecks} = useContext(AuthContext)
  const [currentDecks, setCurrentDecks] = useState()
  const [newDeckData, setNewDeckData] = useState()
  console.log(userDecks)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDeckData({ ...newDeckData, user_id: user.data._id, [name]: value });
  };

  const createNewDeck = async (e) => {
    // e.preventDefault()
    
    try{
      const response = await createDeck(newDeckData)

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const newDeck = await response.json()
      console.log(newDeck)
    } catch (err){
      console.error(err)
    }
    setNewDeckData({user_id: user.data._id, deckName: '', format: ''})
  }

  return (
    <div className="deskFeed">
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
              {deck.format === 'commander'?
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
        <Form onSubmit={createNewDeck}>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control id="deckNameTextInput" placeholder="New Deck Name" name='deckName' onChange={handleInputChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Select id="Format" name="format" onChange={handleInputChange}>
                    <option>Select Format</option>
                    <option value='Standard'>Standard</option>
                    <option value='Commander'>Commander</option>
                    <option value='Historic'>Historic</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Button type="submit">Create</Button>
            </Row>
          </Container>
        </Form>
      </div>
    </div>
  )
}