import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.css";
import { Card, Col, Row, Button, Container } from 'react-bootstrap';

export default function WasteLocationInfo()
{
    let params = useParams();
    let navigate = useNavigate();
    let postcode = params.postcode;
    let fetchURL = "http://localhost:3000/postcode-waste-information/" + postcode;
    console.log(fetchURL);   

      const [postcodeInfo, setPostcodeInfo] = useState([
          {
            postcode: "",
            catchmentarea: "",
            location: { lat: 0, lng: 0},
            bincolours: [],
            bins: [
              {
                bincolour: "",
                description: "",
                daysbetween: 0,
                accepteditems: [],
              },
            ],
          },
      ]);
            
      const fetchData = useCallback(() => {
        fetch(fetchURL)
          .then((res) => res.json())
          .then((data) => {
            const postcode = data[0];
            setPostcodeInfo(postcode);
            console.log(postcode);
          });
      }, [fetchURL]);
    
      useEffect(() => {
        fetchData();
      }, [fetchData]);
        

      //console.log(postcodeInfo)
      
    return(
        <div className='text-center'>
        <h1>Waste Information for {postcodeInfo.postcode}</h1>
        <h2>{postcodeInfo.catchmentarea}Bin Information</h2>
            <Button 
              variant='secondary' 
              onClick={() => {navigate("/waste-information")
              }}>
              Back
              </Button>
              <br/>
              <br/>
             <div> 
                

                <div key={postcodeInfo.postcode}>
                <Container>
                    <Row xs={1} md={1} className="g-4">
                    {postcodeInfo.bins && postcodeInfo.bins.map((bin) => (
                    <Col>
                    <Card className='text-center'>  
                        <Card.Header>
                            <strong className="mr-auto">{bin.bincolour} Bin</strong>
                        </Card.Header>
                        <Card.Body>
                        Please click the button below to see more information about what you can put in this bin!
                        <br/>
                        Description: {bin.description}.
                        </Card.Body>
                        <Card.Footer>
                        <Link to={`/waste-information/${postcodeInfo.postcode}/` + bin.bincolour}>
                        <Button 
                        variant='secondary' >
                        {bin.bincolour} Information
                        </Button>
                        </Link>
                        </Card.Footer>
                    </Card>
                  </Col>
                    ))}
                </Row>
                </Container>
                </div>
              
        
          </div>
    
                    
        </div>
    )
}