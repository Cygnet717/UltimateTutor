import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import { loginUser } from "../../utils/api";
import Auth from "../../utils/auth";
import "./Login.css";

export default function Login() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const { setUserDecks } = useContext(AuthContext);

  // var submit = document.getElementById('submit');
  // submit.className = 'submit';
  // function addClass() {
  //   submit.classList.remove = 'submit';
  //   submit.classList.add = 'test';
  //   submit.innerText = 'Login';
  // }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { token, user } = await response.json();
      Auth.login(token);
      setUserDecks(user.decks);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <Form noValidate validated={false} onSubmit={handleFormSubmit}>
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group>
            <Form.Label htmlFor="email"></Form.Label>
            <Form.Control
              type="text"
              placeholder="Your email"
              name="email"
              size="lg"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password"></Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              size="lg"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
            id="submit"
            size="lg"
            style={{ fontWeight: "300" }}
          >
            LOGIN
            <span class="tooltiptext">You need to enter your info first</span>
          </Button>
          <p style={{ color: "white", fontSize: '13px' }}>
            Not registered? &nbsp;
            <a
              style={{ color: "pink", textDecoration: "none" }}
              href="/signup"
            >
              Create an account
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
}
