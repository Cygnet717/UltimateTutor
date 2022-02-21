import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Auth from "../../utils/auth";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import logo from "../../images/Logo228x75.png";

export default function Navtabs() {
  const { user } = useContext(AuthContext);

  const pathname = window.location.pathname
  // const accountInfo = document.getElementById("account-info");

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <>
      <Navbar expand="lg">
        <Navbar.Brand style={{ padding: "0px" }} href="/">
          <img className="brand" src={logo} alt="The Ultimate Tutor Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {pathname === "/login" || pathname === "/signup" ? ( "" ) : (
          <Nav className="account-info">
            {user.data.username === "default" ? (
              <p>Login for full Access 👉</p>
            ) : (
              <h4 style={{ color: "black" }}>Welcome {user.data.username}</h4>
            )}
            <div className="linkDiv">
              {user.data._id ? (
                <>
                  <Nav.Link href="/desk">My Desk</Nav.Link>
                  <Nav.Link href="/friends">Friends</Nav.Link>
                  <Nav.Link onClick={handleLogout}>LogOut</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Account</Nav.Link>
                </>
              )}
            </div>
          </Nav>)}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
