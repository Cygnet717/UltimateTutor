import React, { useContext, useState } from 'react';
import {v4 as uuid} from 'uuid';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {AuthContext} from "../../context/AuthContext";
import {createDeck, removeDeck} from '../../utils/deckApi';
import bin from '../../images/bin.png'
import './DeskFeed.css';

export default function DeskFeed() {
  const {user} = useContext(AuthContext)
  const {userDecks} = useContext(AuthContext)
  const [newDeckData, setNewDeckData] = useState()
  console.log(userDecks)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDeckData({ ...newDeckData, user_id: user.data._id, [name]: value });
  };

  const createNewDeck = async (e) => {
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

  const startDeleteDeck = async (e) => {
    const deck_id = e.currentTarget.dataset.deck_id
    const user_id = e.currentTarget.dataset.user_id
    console.log('refresh')
    // try{
    //   const response = await removeDeck(deck_id, user_id)
    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }
    //   const deleted = await response.json()
    //   console.log(deleted)
    // }catch(err){
    //   console.error(err)
    // }
  }

  return (
    <div className="deskFeed">
      {userDecks.map(deck => {
        let date = new Date(deck.dateStarted).toLocaleDateString()
        let commander = deck.deckCards.find(card => card.commander )
        return(
          <Container className='singleDeck' key={uuid()}>
            <Col>
              <Container >
                  <Col>{deck.deckName}</Col>
                  <Col>Card Count: {deck.deckCards.length}</Col>
                  <Col>Side Board: {deck.sideBoard.length}</Col>
                  <Col>Version: {deck.versionToBe -1}</Col>
              </Container>
              <Container>
                  <Col>Date Created: {date}</Col>
                  {deck.format === 'commander'?
                    (
                      <Col>Commander: {commander? commander.cardName : '--'}</Col>
                    ):(
                      <Col>Format: {deck.format}</Col>
                    )
                  }
              </Container>
            </Col>
            <Col className='deleteButton' xs={1}>
              <button  data-deck_id={deck._id} data-user_id={deck.user_id} onClick={startDeleteDeck}><img src={bin} alt='delete button'/></button>
            </Col>
          </Container>
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
                    <option value='standard'>Standard</option>
                    <option value='commander'>Commander</option>
                    <option value='historic'>Historic</option>
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