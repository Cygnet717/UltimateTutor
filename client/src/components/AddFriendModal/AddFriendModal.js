import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap'
import { makeFriend } from '../../utils/api';

export default function AddFriendModal(props) {
  const [isValid, setIsValid] = useState(false)
  const [foundFriend, setFoundFriend] = useState()
  const { user } = useContext(AuthContext)

  const checkForUser = (e) => {
    const found = props.users.find(user => user.username === e.target.value)
    console.log(found)
    if(found){
      setIsValid(true)
      setFoundFriend(found)
    }
  }

  const handleFriendRequest = async (e) => {
    e.preventDefault()
    props.onHide()
    setIsValid(false)
    const friendshipData ={
      user_id: user.data._id,
      friend_id: foundFriend._id,
      inPending: false
    }
    const response = await makeFriend(friendshipData)
    const result = await response.json()
    console.log(result)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a friend
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={isValid}>
          <Form.Group className="mb-3">
            <Form.Label>Type in your friends user name *case sensitive*</Form.Label>
            <Form.Control onChange={checkForUser}/>
            <Form.Control.Feedback>Found Your Friend!</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleFriendRequest} onSubmit={handleFriendRequest} disabled={!isValid}>Send Friend Request</Button>
      </Modal.Footer>
    </Modal>
  );
}