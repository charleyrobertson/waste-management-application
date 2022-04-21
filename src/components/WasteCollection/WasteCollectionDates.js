import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.css";
import { Card, Col, Row, Button, Container } from 'react-bootstrap';



export default function WasteCollectionDates({postcodes}) {
    let navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    console.log(postcodes);
 
    return(
        <div className='text-center'>
          <div>
                <h2>Find Waste Information</h2>
                <h5>Please search for your postcode to find out more about waste collection in your exact area! Please
                    enter it with no spaces.
                </h5>
                
                <label for="postcodeInput">Enter your postcode:</label>
                &nbsp;
                <input 
                id='postcodeInput'
                value={searchParams.get("filter") || ""}
                onChange={event => {
                  let filter = event.target.value;
                  if(filter) {
                    setSearchParams({filter});
                  } else {
                    setSearchParams({});
                  }
                }} />
                <br/>
                <br/>

                  <Container>
                    <Row xs={1} md={3} className="g-4">
                      {postcodes.filter((postcodes) => {
                        let filter = searchParams.get("filter");
                        if(!filter) return true;
                        let name = postcodes.postcode.toLowerCase();
                        return name.startsWith(filter.toLowerCase());
                      })
                      .map(postcode => (
                        <Col>
                          <Card className='text-center'>  
                              <Card.Header>
                                  <strong className="mr-auto">{postcode.postcode}</strong>
                              </Card.Header>
                              <Card.Body>
                              {postcode.postcode} is in {postcode.catchmentarea}.
                                <br/>
                                {postcode.catchmentarea} has {postcode.bincolours.length} different bin colours, which are: 
                                    {postcode.bincolours.map((bincolours, bc) => <> <br/> - {bincolours} </>)}
                                    

                              </Card.Body>
                              <Card.Footer>
                                  <Button 
                                  variant='secondary' 
                                  onClick={() => {navigate("/waste-information/" + postcode.postcode.toUpperCase())
                                  }}
                                  >
                                    Find out more...
                                  </Button>
                              </Card.Footer>
                          </Card>
                        </Col>
                      ))}
                      </Row>
                  </Container>
            </div>
        </div>

    )
}