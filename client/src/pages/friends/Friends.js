import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Friends.css'

export default function Friends() {
  return (
    <div id='friendsContent'>
      <div id='friendsList'>
      <h3>Friends</h3>
        <p>Pickel</p>
        <p>Squee</p>
        <p>Meat Logs</p>
        <p>Bucket</p>
      <h3>Pending Friends</h3>
        <p>Johnson<i class="far fa-plus-square"></i><i class="far fa-minus-square"></i></p>
        <p>Willy<i class="far fa-plus-square"></i><i class="far fa-minus-square"></i></p>
        <p>Knob<i class="far fa-plus-square"></i><i class="far fa-minus-square"></i></p>
      </div>
      <div id='activityFeed'>
        <h3>Recent Activity</h3>
        <p>Meat Logs made a new deck</p>
        <p>Squee made a deck</p>
        <p>Meat Logs changed their deck</p>
        <p>Bucket Made a deck</p>
      </div>
    </div>
  )
}