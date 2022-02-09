import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { dropFriend } from '../../../utils/api';

export default function UnfriendModal(props) {
  const [ ,  ] = useState([]);

  const handleUnfriend = () => {
    const userData = {
      user_id: props.userid,
      friend_id: props.friendid
    }
    dropFriend(userData)
    props.resetfriends()
    props.onHide()
  }

  return (
    <Modal {...props}
      aria-labelledby="Unfriend confirmation modal"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Unfriend</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to unfriend {props.friendName}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleUnfriend}>Unfriend</Button>
        <Button variant="primary" onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};