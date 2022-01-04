import Navbar from './components/navbar/Navbar';
import Desk from './pages/desk/Desk';
import Friends from './pages/friends/Friends';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import  { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';


function App() {

  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route exact path="/desk" element={<Desk/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;