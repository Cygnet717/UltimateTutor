import { createContext, useContext, useState, useEffect } from "react"
import { getUserDecks } from '../utils/deckApi'
import { getUserFriends } from '../utils/api'
import Auth from "../utils/auth"

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [ user, setuser ] = useState({data: {username: 'default'}})
  const [userDecks, setUserDecks] = useState([]);
  const [userFriends, setUserFriends] = useState({friends: [], pendingFriends: []});

  // const checkForAuthUser = async () => {
  //     let loggedInUser = Auth.loggedIn()

  //     if(!loggedInUser){
  //       loggedInUser = {data: {username: 'default'}};
  //     } else {
  //       loggedInUser = Auth.getProfile()
  //     }

  //   setuser(loggedInUser)
  // }

  const checkForDecks = async () => {
    let decks = []
    
    if(user.data._id){ 
      let response = await getUserDecks(user.data._id)
      decks = await response.json()
    }
    
    setUserDecks(decks)
  }

  const checkForFriends = async () => {
    let friends = {friends: [], pendingFriends: []}
    
    if(user.data._id){ 
      const response = await getUserFriends(user.data._id)
      const results = await response.json()
      friends = {
        friends: results.friends,
        pendingFriends: results.pendingFriends
      }
    }
    setUserFriends(friends)
  }

  useEffect( () => {
    let loggedInUser = Auth.loggedIn()

    if(!loggedInUser){
      loggedInUser = {data: {username: 'default'}};
    } else {
      loggedInUser = Auth.getProfile()
    }

    setuser(loggedInUser)
  }, [])

  useEffect(() => {
    checkForDecks()
    checkForFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <AuthContext.Provider value={{ user, userDecks, setUserDecks, checkForDecks, userFriends, checkForFriends }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer
export { AuthContext, AuthProvider, AuthConsumer }