import { createContext, useContext, useState, useEffect } from "react"
import Auth from "../utils/auth"

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [ authState, setAuthState ] = useState({})
  const providerVals = { ...authState, setAuthState }

  const checkForAuthUser = async () => {
    let loggedInUser = null;
    try {
      loggedInUser = Auth.getProfile()
    } catch( e ){
      console.log(e)
    }
    setAuthState(loggedInUser)
  }

  useEffect( () => {
    checkForAuthUser()
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer
export { AuthContext, AuthProvider, AuthConsumer }