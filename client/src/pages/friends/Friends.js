import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Accordion, Button } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext';
import { getUserDecks } from '../../utils/deckApi';
import { getAllUser, makeFriend, dropFriend } from '../../utils/api';
import AddFriendModal from '../../components/Modals/AddFriendModal/AddFriendModal'
import UnfriendModal from '../../components/Modals/RemoveFriendModal/RemoveFriendModal';
import './Friends.css'
import FriendDeckList from '../../components/FriendDeckList/FriendDeckList';

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
      friendId: friendId,
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
          <p key={friend._id} className={friend.username === friendDecks.username ? 'friendButton highlighted' : 'friendButton'} onClick={() => handleSelectedFriend(friend._id, friend.username)}>{friend.username}</p>

        )}
        <Button variant="primary" onClick={() => setShowFriendModal(true)}>
          Make A Friend
        </Button>

        <AddFriendModal
          show={showFriendModal}
          allusers={allUsers}
          currFriends={userFriends.friends}
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
          <Accordion>
            {friendDecks.decks.map((deck, i) => 
                  <Accordion.Item  eventKey={i} key={deck._id}>
                    <Accordion.Header>
                    <h5>{deck.deckName}</h5>
                    <div>
                      {deck.format === 'Commander'? 
                        <>Commander: {deck.commander ? deck.commander.cardName : '----'}</>
                        :
                        <>Format: {deck.format}</>
                      }
                      || DateCreated: {moment(deck.dateStarted).format('MMMM DD YYYY')} 
                    </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <FriendDeckList deck={deck}></FriendDeckList>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
           
          </Accordion>
          
          <Button variant="danger" onClick={() => handleUnfriend()}>Unfriend</Button>
          </>
          :
          <>
          no selected friend
          </>
        }
        <UnfriendModal
          show={showUnfriendModal}
          onHide={() => setShowUnfriendModal(false)}
          userid={user.data._id}
          friendname={friendDecks.username}
          friendid={friendDecks.friendId}
          resetfriends={() => checkForFriends()}
        />
      </div>

    </div>
  )
}
