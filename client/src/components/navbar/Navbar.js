import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext"
import './Navbar.css'

export default function Navbar() {
  const {user} = useContext(AuthContext)

  
  return (
    <div className='header'>
      <h1 className='pageName'>Ultimate Tutor</h1>
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
              <Link to='/'>LogOut</Link>
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