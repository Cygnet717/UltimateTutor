import React from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom';

export default function Navbar() {
  
    return (
        <div className="container">
            <h1>Ultimate Tutor</h1>
            <Link to="login">LogIn</Link>
            <Link to="signup">SignUp</Link>
            <Link to="friends">Friends</Link>
            <Link to="desk">My Desk</Link>
        </div>
    )
}