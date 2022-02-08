import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext';
import { getUserDecks } from '../../utils/deckApi';
import { getAllUser, makeFriend, dropFriend } from '../../utils/api';
import AddFriendModal from '../../components/AddFriendModal/AddFriendModal'
import './Friends.css'

export default function Friends() {
  const [ showFriendModal, setShowFriendModal ] = useState(false);
  const [ showUnfriendModal, setShowUnfriendModal] = useState(false);
  const [ allUsers, setAllUsers ] = useState();
  const [ friendDecks, setFriendDecks ] = useState(false);
  const { user, userFriends, checkForFriends } = useContext(AuthContext);
  
  const collectAllUserData = async () => {
    const response = await getAllUser()
    const result = await response.json()    
    setAllUsers(result)
  }

  const handleFriendResponse = async (event, friend_id) => {
    const classString = event.currentTarget.getAttribute('class')
    const friendData = {
      user_id: user.data._id,
      friend_id: friend_id,
      inPending: true
    }
    if(classString.includes('plus')){
      const response = await makeFriend(friendData)
      checkForFriends()
    } else if (classString.includes('minus')){
      const response = await dropFriend(friendData)
      checkForFriends()
    }
  }

  const handleSelectedFriend = async (friendId, friendName) => {
    const response = await getUserDecks(friendId)
    const result = await response.json()
    setFriendDecks({
      username: friendName,
      decks: result
    })
  }

  const handleUnfriend = () => {
    setShowUnfriendModal(true)
  }

  useEffect(() => {
    collectAllUserData()
  }, [])

  return (
    <div id='friendsContent'>
      <div id='friendsList'>
        <h3>Friends</h3>
        {userFriends.friends.map(friend => 
          <p key={friend._id} onClick={() => handleSelectedFriend(friend._id, friend.username)}>{friend.username}</p>

        )}
        <Button variant="primary" onClick={() => setShowFriendModal(true)}>
          Make A Friend
        </Button>

        <AddFriendModal
          show={showFriendModal}
          allusers={allUsers}
          curruser= {user.data}
          onHide={() => setShowFriendModal(false)}
        />
        
        <h3>Pending Friends</h3>
        {userFriends.pendingFriends.map(penFren => 
          <p key={penFren._id}>{penFren.username}
            <i className="far fa-plus-square" onClick={(e) => handleFriendResponse(e, penFren._id)}></i>
            <i className="far fa-minus-square" onClick={(e) => handleFriendResponse(e, penFren._id)}></i>
          </p>
        )}
      
      </div>
      <div id='activityFeed'>
        {friendDecks? 
          <>
          <h3>{friendDecks.username} Decks</h3>
          {friendDecks.decks.map(deck => 
            <div key={deck._id}>
              <h5>{deck.deckName}</h5>
              <p>Format: {deck.format} || DateCreated: {moment(deck.dateStarted).format('MMMM DD YYYY')} </p>
            </div>
          )}
          
          <Button variant="danger" onClick={() => handleUnfriend()}>Unfriend</Button>
          </>
          :
          <>
          no selected friend
          </>
        }
        
      </div>
    </div>
  )
}