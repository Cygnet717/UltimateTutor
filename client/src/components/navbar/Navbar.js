import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { Button, Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import Auth from '../../utils/auth';
import {AuthContext} from "../../context/AuthContext"
import './Navbar.css'
import logo from "../../images/Logo228x75.png";

export default function Navtabs() {
  const {user} = useContext(AuthContext)

  const handleLogout = () => {
    Auth.logout()
  }
  
  return (
    <>
    {/* <div className='header'>
      <Link to='/'>
        <h1 className='pageName'>Ultimate Tutor</h1>
        <Button variant="outline-dark" className='logoutButton' onClick={handleLogout}>Logout</Button>
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
    </div> */}

<Navbar bg="light" expand="lg">
    <Navbar.Brand style={{padding: '0px'}} href="/"><img className="brand" src={logo} alt="The Ultimate Tutor Logo"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
            {user.data.username ==='default'? 
              (<p>Login for full Access 👉</p>)
              :
              (<h4 style={{color: 'black'}}>Welcome {user.data.username}</h4>)}
              <div className='linkDiv'>
        {user.data._id?
          (
            <>
              <Nav.Link href="/desk">My Desk</Nav.Link>
              <Nav.Link href="/friends">Friends</Nav.Link>
              <Nav.Link onClick={handleLogout}>LogOut</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Account</Nav.Link>
            </>
          )
        }
      </div>
        {/* <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link> */}
      </Nav>
    </Navbar.Collapse>
</Navbar>
</>
  )
}