import { useState, useEffect } from "react";
import Navbar from './components/navbar-footer/Navbar';
import Home from './pages/home/Home';
import Desk from './pages/Desk';
import Login from './pages/Login';
import Signup from './pages/Signup';
import  { AuthProvider } from './context/AuthContext'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  // const [ authState, setAuthState ] = useState({})

  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/setting" element={<Setting/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;