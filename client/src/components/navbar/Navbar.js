import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';
import {AuthContext} from "../../context/AuthContext"
import './Navbar.css'

export default function Navbar() {
  const {user} = useContext(AuthContext)

  const handleLogout = () => {
    Auth.logout()
  }
  
  return (
    <div className='header'>
      <Link to='/'>
        <h1 className='pageName'>Ultimate Tutor</h1>
      </Link>
      {user.data.username ==='default'? 
            (<h4>Please log in</h4>)
            :
            (<h1>Hello {user.data.username}</h1>)}

      <div className='linkDiv'>
        {user.data._id?
          (
            <>
              <Link to="desk">My Desk</Link>
              <Link to="friends">Friends</Link>
              <a onClick={handleLogout}>LogOut</a>
            </>
          ) : (
            <>
              <Link to="login">LogIn</Link>
              <Link to="signup">SignUp</Link>
            </>
          )
        }
      </div>
    </div>
  )
}