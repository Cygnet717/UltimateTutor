import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap'
import {AuthContext} from '../../context/AuthContext';
import { getAllUser, makeFriend } from '../../utils/api';
import AddFriendModal from '../../components/AddFriendModal/AddFriendModal'
import './Friends.css'

export default function Friends() {
  const [modalShow, setModalShow] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const { user, userFriends, checkForFriends } = useContext(AuthContext);
  
  const collectAllUserData = async () => {
    const response = await getAllUser()
    const result = await response.json()    
    setAllUsers(result)
  }

  const handleYesFriend = async (friend_id) => {
    const friendData = {
      user_id: user.data._id,
      friend_id: friend_id,
      inPending: true
    }
    const response = await makeFriend(friendData)
    const result =  await response.json()
    // const friends = {
    //   friends: result.friends,
    //   pendingFriends: result.pendingFriends
    // }
    checkForFriends()
  }

  const handleNoFriend = async (friend_id) => {

  }

  useEffect(() => {
    collectAllUserData()
  }, [])

  return (
    <div id='friendsContent'>
      <div id='friendsList'>
        <h3>Friends</h3>
        {userFriends.friends.map(fren => 
          <p key={fren._id}>{fren.username}</p>

        )}
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Make A Friend
        </Button>

        <AddFriendModal
          show={modalShow}
          allusers={allUsers}
          curruser= {user.data}
          onHide={() => setModalShow(false)}
        />
        
        <h3>Pending Friends</h3>
        {userFriends.pendingFriends.map(penFren => 
          <p key={penFren._id}>{penFren.username}
            <i className="far fa-plus-square" onClick={() => handleYesFriend(penFren._id)}></i>
            <i className="far fa-minus-square" onClick={() => handleNoFriend(penFren._id)}></i>
          </p>
        )}
      
      </div>
      <div id='activityFeed'>
        <h3>Recent Activity</h3>
        <p>Meat Logs made a new deck</p>
        <p>Squee made a deck</p>
        <p>Meat Logs changed their deck</p>
        <p>Bucket Made a deck</p>
      </div>
    </div>
  )
}