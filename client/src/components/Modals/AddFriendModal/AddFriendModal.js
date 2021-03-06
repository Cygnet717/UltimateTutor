import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { makeFriend } from '../../../utils/api';

export default function AddFriendModal(props) {
  const [ isValid, setIsValid ] = useState()
  const [ foundFriend, setFoundFriend ] = useState()
  const [ feedback, setFeedback ] = useState()

  const checkForUser = (e) => {
    const currFriend = props.currFriends.find(user => user.username === e.target.value)
    const found = props.allusers.find(user => user.username === e.target.value)
    if(currFriend){
      setFeedback('You are already friends!')
      setIsValid(true)
    } else if(found){
      setFeedback('Become friends now!')
      setIsValid(true)
      setFoundFriend(found)
    }
  }

  const handleFriendRequest = async (e) => {
    e.preventDefault()
    props.onHide()
    setIsValid(false)
    const friendshipData ={
      user_id: props.curruser._id,
      friend_id: foundFriend._id,
      inPending: false
    }
    const response = await makeFriend(friendshipData)
    const result = await response.json()
    return result
  }

  return (
    <Modal {...props}
      size="lg"
      aria-labelledby="Add new friend modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="Add new friend modal">
          Add a friend
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={isValid}>
          <Form.Group className="mb-3">
            <Form.Label>Type in your friends user name *case sensitive*</Form.Label>
            <Form.Control onChange={checkForUser}/>
            <Form.Control.Feedback>{feedback}</Form.Control.Feedback>
            
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleFriendRequest} onSubmit={handleFriendRequest} disabled={!isValid}>Send Friend Request</Button>
      </Modal.Footer>
    </Modal>
  );
}