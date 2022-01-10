import React, {useState} from 'react';
import './Home.css';
import { Form, Button, FormControl } from 'react-bootstrap';
import Card from '../../components/card/Card'
import scryfallSearch from '../../utils/scryfallApiCalls'

export default function Home() {
  const [advSearch, setAdvSearch] = useState(false)
  const [searchFormData, setSearchFormData] = useState({color: ''})
  const [searchResults, setSearchResults] = useState({})

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setSearchFormData({...searchFormData, [name]: value});
  }

  const handleColorChange = (event) => {
    let colorList = searchFormData.color

    //if true add color to list
    if(event.target.checked){
      let newColorList = colorList.concat(event.target.value)
      setSearchFormData({...searchFormData, color: newColorList})
    } else {//if false remove color from list
      let newColorList = colorList.replace(event.target.value, '')
      setSearchFormData({...searchFormData, color: newColorList})
    }
    
  }
  
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log(searchFormData.cardName)
    let response = await scryfallSearch('t%3Acreature color%3Ar pow>5')
    let cardResults = await response.json()
    setSearchResults(cardResults)
    console.log(searchFormData)
  }
  
  return (
    <>
    <div>
      <Form className='searchForm' onSubmit={handleSearchSubmit}>
        <div className='searchSection'>
          <Form.Select aria-label="select card type" className='fitContent' name="t:" onChange={handleInputChange}>
            <option>Card Type</option>
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
            <Form.Check type="checkbox" id="custom-checkbox" label="Multicolor" value="m" name='color' onChange={handleInputChange}/> 
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
      
      
      {searchResults?
        <>Results</>
        :
        <>
        <Card/>
      <Card/>
      <Card/>
      <Card/>
        </>
      }
  
    </div>


    
    </>
  )
}