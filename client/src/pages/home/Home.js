import React, {useState, useContext} from 'react';
import './Home.css';
import { Form, Button, FormControl } from 'react-bootstrap';
import {AuthContext} from "../../context/AuthContext"
import Card from '../../components/card/Card'
import {scryfallSearch, scryfallNamedSearch} from '../../utils/scryfallApiCalls'

export default function Home() {
  const [advSearch, setAdvSearch] = useState(false)
  const [searchFormData, setSearchFormData] = useState({color: '%3A'}) //'%3A' Percent-encoding for ':'
  const [searchResults, setSearchResults] = useState(false)
  const {user, userDecks} = useContext(AuthContext)
  const loggedIn = user.data.username ==='default'? false: true

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setSearchFormData({...searchFormData, [name]: value});
  }

  const handleColorChange = (event) => {
    let colorList = searchFormData.color

    //if true add color to list
    if(event.target.checked){
      let newColorList;
      if(event.target.value === 'm'){
        newColorList = colorList.substring(0, 2)+ 'E' + colorList.substring(3)//change percent-encoding to '>'
      } else {
        newColorList = colorList.concat(event.target.value)
      }
      setSearchFormData({...searchFormData, color: newColorList})

    } else {//if false remove color from list
      let newColorList;
      if(event.target.value === 'm'){
        newColorList = colorList.substring(0, 2)+ 'A' + colorList.substring(3)
      } else {
        newColorList = colorList.replace(event.target.value, '')
      }
      setSearchFormData({...searchFormData, color: newColorList})
    }
  }
  
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    let response;
    let cardResults;

    if(searchFormData.cardName){
      response = await scryfallNamedSearch(searchFormData.cardName);
      cardResults = await response.json();
      setSearchResults(cardResults)
    } else {
      let query = '';
      if(searchFormData.color.length > 3){
        query = query.concat(" color" + searchFormData.color)
      }
      if(searchFormData.type){
        query = query.concat(' t%3A' + searchFormData.type)
      }
      response = await scryfallSearch(query);
      cardResults = await response.json();
      setSearchResults(cardResults);
    }
  }

  
  
  return (
    <>
    <div>
      <Form className='searchForm' onSubmit={handleSearchSubmit}>
        <div className='searchSection'>
          <Form.Select aria-label="select card type" className='fitContent' name="type" onChange={handleInputChange}>
            <option value=''>Card Type</option>
            <option value="creature">Creature</option>
            <option value="sorcery">Sorcery</option>
            <option value="instant">Instant</option>
          </Form.Select>
          <FormControl
            placeholder="Card Name"
            className='fitContent'
            aria-label="card name"
            aria-describedby="basic-addon1"
            name="cardName"
            onChange={handleInputChange}
          />
        </div>
        <div className='searchSection'>
          <div className='color white'>
            <Form.Check type="checkbox" id="custom-checkbox" label="White" name='color' value="w" onChange={handleColorChange}/>
          </div>
          <div className='color blue'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Blue" name='color' value="u" onChange={handleColorChange}/> 
          </div>
          <div className='color black'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Black" name='color' value="b" onChange={handleColorChange}/> 
          </div>
          <div className='color red'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Red" name='color' value="r" onChange={handleColorChange}/> 
          </div>
          <div className='color green'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Green" name='color' value="g" onChange={handleColorChange}/>
          </div>
          <div className='color colorless'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Colorless" value="c" name='color' onChange={handleColorChange}/> 
          </div>
          <div className='color multicolor'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Multicolor" value="m" name='color' onChange={handleColorChange}/> 
          </div>
        </div>
        {advSearch? 
          <>
            More Search Options
          </>
          :
          <></>
        }
        <div>
          <Button onClick={() =>setAdvSearch(!advSearch)}>Advanced Search</Button>
          <Button type="submit">Search</Button>
        </div>
        
      </Form>
    </div>

    <div className="resultsContainer">
      
      
      {searchResults.data?
        <>{searchResults.data.map(card => 
          <Card cardData={card} loggedIn={loggedIn} deckData={userDecks} key={card.id}/>
        )}</>
        :
        <>
          <Card loggedIn={loggedIn} deckData={userDecks}/>
          <Card loggedIn={loggedIn} deckData={userDecks}/>
          <Card loggedIn={loggedIn} deckData={userDecks}/>
          <Card loggedIn={loggedIn} deckData={userDecks}/>
        </>
      }
  
    </div>


    
    </>
  )
}