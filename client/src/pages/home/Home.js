import React from 'react';
import './Home.css';
import Card from '../../components/card/Card'

export default function Home() {
  return (
    <>
    <div className="container">
      <h1>Home</h1>
      <p>search stuff here</p>
      <form>
        <input type="text" name="searchField" placeholder="Search"/>
        <button type="submit">Search</button>
      </form>
    </div>
    <div className="resultsContainer">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      
    {/* {APIDATA.results ? (
        <>{APIDATA.results.map(card =>{
            return(
              <Card cardData={card}/>
          )
        })
      }
        </>
      ) : <p>nothing here</p>
      } */}
    </div>


    
    </>
  )
}