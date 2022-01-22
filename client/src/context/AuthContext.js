import { createContext, useContext, useState, useEffect } from "react"
import { getUserDecks} from '../utils/deckApi'
import Auth from "../utils/auth"

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [ user, setuser ] = useState({data: {username: 'default'}})
  const [userDecks, setUserDecks] = useState([]);

  const checkForAuthUser = async () => {
      let loggedInUser = Auth.loggedIn()

      if(!loggedInUser){
        loggedInUser = {data: {username: 'default'}};
      } else {
        loggedInUser = Auth.getProfile()
      }

    console.log(loggedInUser)
    setuser(loggedInUser)
  }

  const checkForDecks = async () => {
    let decks = []
    
    if(user.data._id){ 
      let response = await getUserDecks(user.data._id)
      decks = await response.json()
    }
    
    setUserDecks(decks)
  }

  useEffect( () => {
    checkForAuthUser()
  }, [])
  useEffect(() => {
    checkForDecks()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setuser, userDecks, setUserDecks, checkForDecks }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer
export { AuthContext, AuthProvider, AuthConsumer }