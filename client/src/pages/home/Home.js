import React, {useState} from 'react';
import './Home.css';
import { Form, Button, FormControl } from 'react-bootstrap';
import Card from '../../components/card/Card'

export default function Home() {
  const [advSearch, setAdvSearch] = useState(false)
  //card name, color, cardtype
  
  return (
    <>
    <div>
      <Form className='searchForm'>
        <div className='searchSection'>
          <Form.Select aria-label="select card type" className='fitContent'>
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
          />
        </div>
        <div className='searchSection'>
          <Form.Check type="checkbox" id="custom-checkbox" label="White" className='color white'/> 
          <Form.Check type="checkbox" id="custom-checkbox" label="Blue" className='color blue'/> 
          <Form.Check type="checkbox" id="custom-checkbox" label="Black" className='color black'/> 
          <Form.Check type="checkbox" id="custom-checkbox" label="Red" className='color red'/> 
          <Form.Check type="checkbox" id="custom-checkbox" label="Green" className='color green'/> 
          <Form.Check type="checkbox" id="custom-checkbox" label="Colorless" className='color colorless'/> 
        </div>
        {advSearch? 
          <>
            More Search Options
            <Button onClick={() => setAdvSearch(!advSearch)}>Advanced Search</Button>
          </>
          :
          <Button onClick={() =>setAdvSearch(!advSearch)}>Advanced Search</Button>
        }
        <Button type="submit">Search</Button>
      </Form>
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