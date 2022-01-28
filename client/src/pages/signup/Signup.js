import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import { createUser } from "../../utils/api";
import Auth from "../../utils/auth";
import "./Signup.css";

export default function SignUp() {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  // const [ validated, setValidated ] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // const [context, setContext] = useContext(AuthContext)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { token } = await response.json();
      Auth.login(token);
      // setContext(token)
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <div className="login-page"></div>
      <h1>Sign Up</h1>
      <Form noValidate validated={false} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
          style={{ width: "46ch", display: 'flex' }}
        >
          Something went wrong with your sign up credentials!
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
          <Form.Label htmlFor="email"></Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            size="lg"
            onChange={handleInputChange}
            value={userFormData.username}
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
            Sign Up
          </Button>
          <p style={{ color: "white", fontSize: '16px' }}>
            <a
              style={{ color: "#198754", textDecoration: "none" }}
              href="/login"
            >
              Already have an account?
            </a>
          </p>
      </Form>
    </div>
  );
}
