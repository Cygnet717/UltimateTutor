import React from 'react';
import './Home.css';
import DeckFeed from '../../components/deckfeed/DeckFeed';

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
        {/* <div className="resultsContainer">
        {APIDATA.results ? (
            <>{APIDATA.results.map(DATA =>{
                return(
                  <div>
                      RESULTS HERE
                  </div>
              )
            })
          }
            </>
          ) : <p>nothing here</p>
          }
        </div> */}
        </>
    )
}