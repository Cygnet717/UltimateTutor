import React from 'react';
import './Desk.css'
import DeskFeed from '../../components/deskfeed/DeskFeed';

export default function Desk() {
    return (
        <div className="container">
            <h1>Desk</h1>
            <DeskFeed />
        </div>
    )
}