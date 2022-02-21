import React, { useContext, useState } from 'react';
// import {Link} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from "../../context/AuthContext";
import { createDeck, removeDeck } from '../../utils/deckApi';
import './DeskFeed.css';

export default function DeskFeed() {
  const { user, userDecks, checkForDecks } = useContext(AuthContext)
  const [ newDeckData, setNewDeckData ] = useState({user_id: user.data._id, deckName: '', format: ''})

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDeckData({ ...newDeckData, user_id: user.data._id, [name]: value, commander: null });
  };

  const createNewDeck = async (e) => {
    e.preventDefault()
    try{
      const response = await createDeck(newDeckData)

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const newDeck = await response.json()
      setNewDeckData({user_id: user.data._id, deckName: '', format: ''})
    checkForDecks()
    } catch (err){
      console.error(err)
    }
  }

  const startDeleteDeck = async (e) => {
    const deck_id = e.currentTarget.dataset.deck_id
    const user_id = e.currentTarget.dataset.user_id
    try{
      const response = await removeDeck(deck_id, user_id)
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const deleted = await response.json()
      checkForDecks()

    }catch(err){
      console.error(err)
    }
  }

  const showDeckList = (id) => {
    window.location.assign(`/deckList/${id}`)
  }

  return (
    <div className="deskFeed">
      {userDecks.map(deck => {
        let date = new Date(deck.dateStarted).toLocaleDateString()
        let commander = deck.commander? deck.commander : false
        return(
          <Container className='singleDeck' key={uuid()}>
            <Col>
              <Container >
                  <Col onClick={() => showDeckList(deck._id)} className='border pointer'>{deck.deckName}</Col>
                  <Col>Card Count: {deck.deckCards.length}</Col>
                  <Col>Side Board: {deck.sideBoard.length}</Col>
                  {/* <Col>Version: {deck.versionToBe -1} <button>Save Version</button></Col> --simplify MVP*/}
              </Container>
              <Container>
                  <Col>Date Created: {date}</Col>
                  {deck.format === 'Commander'?
                    (
                      <Col>Commander: {commander? commander.cardName : '--'}</Col>
                    ):(
                      <Col>Format: {deck.format}</Col>
                    )
                  }
              </Container>
            </Col>
            <Col className='deleteButton' xs={1}>
              <button  data-deck_id={deck._id} data-user_id={deck.user_id} onClick={startDeleteDeck}><i className="fas fa-trash"></i></button>
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
                  <Form.Control id="deckNameTextInput" placeholder="New Deck Name" name='deckName' onChange={handleInputChange} value={newDeckData.deckName}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Select id="Format" name="format" className='pointer' onChange={handleInputChange} value={newDeckData.format}>
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