import React from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom';

export default function Navbar() {
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
            <div style={style.linkDiv}>
                <Link to="login">LogIn</Link>
                <Link to="signup">SignUp</Link>
                <Link to="friends">Friends</Link>
                <Link to="desk">My Desk</Link>
            </div>
        </div>
    )
}