import React, { useContext } from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext"

export default function Navbar() {
  const {user} = useContext(AuthContext)

  const style = {
    header: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      outline: '2px solid red'
    },
    linkDiv: {
      display: 'flex',
      justifyContent: "space-between",
      width: '40%'
    },
    pageName: {
      margin: '20px'
    }
  }
  
  return (
    <div style={style.header} className="container">
      <h1 style={style.pageName}>Ultimate Tutor</h1>
      {user.data.username ==='default'? 
            (<h4>Please log in</h4>)
            :
            (<h1>Hello {user.data.username}</h1>)}

      <div style={style.linkDiv}>
        {
          user.data._id?(
            <>
              <Link to='/'>LogOut</Link>
              <Link to="friends">Friends</Link>
              <Link to="desk">My Desk</Link>
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