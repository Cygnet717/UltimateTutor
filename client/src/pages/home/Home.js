import React, {useState, useContext} from 'react';
import './Home.css';
import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import {AuthContext} from "../../context/AuthContext"
import Card from '../../components/card/Card'
import {scryfallSearch, scryfallNamedSearch} from '../../utils/scryfallApiCalls'

export default function Home() {
  const [ advSearch, setAdvSearch ] = useState(false)
  const [ searchFormData, setSearchFormData ] = useState({color: '%3A'}) //'%3A' Percent-encoding for ':'
  const [ isValid, setIsValid ] = useState(true)
  const [ searchResults, setSearchResults ] = useState(false)
  const [ constructingDeck, setConstructingDeck ] = useState({deck_id: ''})
  const { user, userDecks } = useContext(AuthContext)
  const loggedIn = user.data.username ==='default'? false: true

  const numRegex = /^[0-9]*$/

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if(event.target.name === 'cmc'){
      const result = numRegex.test(event.target.value)
      setIsValid(result)
    }
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

    console.log("thinking")
    //start thinking gif
    if(searchFormData.cardName){
      response = await scryfallNamedSearch(searchFormData.cardName);
      cardResults = await response.json();
      setSearchResults({data: [{...cardResults}]})
    } else {
      let query = '';
      if(searchFormData.color.length > 3){
        query = query.concat(` color${searchFormData.color}`)
      }
      if(searchFormData.type){
        query = query.concat(` t%3A${searchFormData.type}`)
      }
      if(searchFormData.text){
        query = query.concat(` o%3A'${searchFormData.text}'`)
      }
      if(searchFormData.cmc && isValid){ //looks for exact cmc
        query = query.concat(` cmc${searchFormData.cmcop}${searchFormData.cmc}`)
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
          <Form.Select aria-label="select card type" className='fitContent pointer' name="type" onChange={handleInputChange}>
            <option value=''>Card Type</option>
            <option value="creature">Creature</option>
            <option value="sorcery">Sorcery</option>
            <option value="instant">Instant</option>
            <option value="enchantment">Enchantment</option>
            <option value="land">Land</option>
            <option value="planeswalker">Planeswalker</option>
            <option value="legendary">Legendary</option>
            
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
          <div className='color white pointer'>
            <Form.Check type="checkbox" id="custom-checkbox" label="White" name='color' value="w" onChange={handleColorChange}/>
          </div>
          <div className='color blue pointer'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Blue" name='color' value="u" onChange={handleColorChange}/> 
          </div>
          <div className='color black pointer'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Black" name='color' value="b" onChange={handleColorChange}/> 
          </div>
          <div className='color red pointer'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Red" name='color' value="r" onChange={handleColorChange}/> 
          </div>
          <div className='color green pointer'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Green" name='color' value="g" onChange={handleColorChange}/>
          </div>
          <div className='color colorless pointer'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Colorless" value="c" name='color' onChange={handleColorChange}/> 
          </div>
          <div className='color multicolor pointer'>
            <Form.Check type="checkbox" id="custom-checkbox" label="Multicolor" value="m" name='color' onChange={handleColorChange}/> 
          </div>
        </div>
        {advSearch? 
          <>
            <InputGroup className="mb-3">
              <InputGroup.Text>Card Text</InputGroup.Text>
              <FormControl
              aria-label="card text"
              aria-describedby="basic-addon1"
              name="text"
              onChange={handleInputChange}
              />
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text>CMC</InputGroup.Text>
              <Form.Check
                inline
                label=">"
                name="cmcop"
                value='%3E'
                type='radio'
                id={`inline-radio-1`}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="="
                value='%3D'
                name="cmcop"
                selected
                type='radio'
                id={`inline-radio-2`}
                onChange={handleInputChange}
              />
              <Form.Check
                inline  
                label="<"
                value='%3C'
                name="cmcop"
                type='radio'
                id={`inline-radio-3`}
                onChange={handleInputChange}
              />
              <FormControl 
              aria-label="converted mana cost"
              aria-describedby="basic-addon1"
              name="cmc"
              style={isValid? {} : {border: '2px solid red', borderRadius: '3px'}}
              onChange={handleInputChange}
              />
            </InputGroup>
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
        <>
        {searchResults.data.map(card => 
          <Card 
            cardData = {card} 
            loggedIn = {loggedIn} 
            deckData = {userDecks} 
            constructingDeck = {constructingDeck}
            setConstructingDeck = {setConstructingDeck}
            key = {card.id}/>
        )}
        </>
        :
        <>
          Results Area
        </>
      }
  
    </div>


    
    </>
  )
}