import React, { useContext } from 'react';
import './Desk.css'
import {AuthContext} from "../../context/AuthContext"
import DeskFeed from '../../components/deskfeed/DeskFeed';

export default function Desk() {
  const {user} = useContext(AuthContext)
  return (
    <div className="container">
      <h1>{user.data.username}'s Desk</h1>
      <DeskFeed />
    </div>
  )
}