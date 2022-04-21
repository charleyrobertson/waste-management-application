import React, { useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.css";
import { Card, Col, Row, Container } from 'react-bootstrap';

//Map imports
import GoogleMapReact from 'google-map-react';

//Code for pin component
const CurrentPin = ({text}) => {  
 return(
    <div>
      <img alt="marker" width="10px" height="15px" src='https://i.postimg.cc/15JCk2X3/clipart1367384.png'/>  
     </div> 
  )
}

export default function LocalRecyclingCentres(postcodes)
{
  //Search stuff
  // let [searchParams, setSearchParams] = useSearchParams();
  // let[searchTerm, setSearchTerm] = useState([]);

  //Getting recycling centres from the postcode list.
  const [recyclingCentres, setRecyclingCentres] = useState([
    {
      postcode: "",
      name: "",
      catchmentarea: "",
      location: { lat: 0, lng: 0},
    },
  ]);

  useEffect(() => {
      setRecyclingCentres(postcodes.centres);  
  }, [postcodes.centres]);

  //Function for calculating the distance between two locations.
  function getDistance (location1, location2) {
    if(location2)
    {
      //console.log(location2);
      const earthRadius = 6371; // km 

      const diffLat = (location2.lat-location1.lat) * Math.PI / 180;  
      const diffLng = (location2.lng-location1.lng) * Math.PI / 180;  
  
      const arc = Math.cos(
        location1.lat * Math.PI / 180) * Math.cos(location2.lat * Math.PI / 180) 
                      * Math.sin(diffLng/2) * Math.sin(diffLng/2)
                      + Math.sin(diffLat/2) * Math.sin(diffLat/2);
      const line = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1-arc));
  
      const distance = earthRadius * line; 

      return "This recycling center is: " + distance.toFixed(2) + " miles away from Salsburgh.";
    }
    else{
      return "Please enter a postcode!";
    }
  }

//   //Postcode information -- Future implementation
//   const [postcode, setPostcode] = useState([
//     {
//       postcode: "",
//       catchmentarea: "",
//       location: { lat: 0, lng: 0},
//       bincolours: [],
//       bins: [
//         {
//           bincolour: "",
//           description: "",
//           daysbetween: 0,
//           accepteditems: [],
//         },
//       ],
//     },
//   ]);

//   useEffect(function effectFunction() {
//     async function fetchPostcode() {
//         const response = await fetch('  http://localhost:3000/postcode-waste-information/' + searchTerm);
//         const json = await response.json();
//         setPostcode(json.data);
//     }
//     fetchPostcode();
//     console.log(postcode);
// }, [searchTerm]);


    return(
      <div className='text-center'>
        <h1>Find your Local Recycling Centre</h1>
        <h2>Enter your postcode to find out the closest recycling centre to you!</h2>
        {/* <label for="postcodeInput">Enter your postcode:</label>
                &nbsp;
                <input 
                id='postcodeInput'
                value={searchParams.get("filter") || ""}
                onChange={event => {
                  let filter = event.target.value;
                  if(filter) {
                    setSearchParams({filter});
                    setSearchTerm(filter.toUpperCase());
                    console.log(filter);
                  } else {
                    setSearchParams({});
                  }
                }} />
                 <br/> */}


        <div style={{width: '100%', height: 400, margin: 'auto', marginTop: 10 }}>
          <GoogleMapReact
          className="react-map"
          bootstrapURLKeys={{key: "AIzaSyCQjIHIAncRQmItoiSjlfRtAKchRdbEM84"}}
          defaultCenter={{lat: 56, lng: -4}}
          defaultZoom={ 6}
          center={{lat: 56, lng: -4}}
          >

          {recyclingCentres && recyclingCentres.map((val) => (
            <CurrentPin
            lat={val.location.lat}
            lng={val.location.lng}/>
          ))}

          </GoogleMapReact>

            <br/>
          <div key={recyclingCentres.postcode}>
            <Container>
            <Row xs={1} md={1} className="g-4">
            {recyclingCentres && recyclingCentres.map((val) => (
              <div>
                <Col>
                    <Card className='text-center'>  
                        <Card.Header>
                            <strong className="mr-auto">{val.name}</strong>
                        </Card.Header>
                        <Card.Body>
                        The recycling centres postcode is:
                        <br/>
                        {val.postcode}
                        </Card.Body>
                        <Card.Footer>
                           {getDistance(val.location, {lat: 55.8434334, lng: -3.8741858})} 
                        </Card.Footer>
                    </Card>
                  </Col>
              </div>
              ))}
          </Row>
          </Container>
          </div>
         </div>
      </div>
    );
  
}

