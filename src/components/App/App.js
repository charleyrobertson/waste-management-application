import React, {useEffect, useState} from 'react';
import './App.css';

//React router dom imports
import {Routes,
        Route } from "react-router-dom";

  //Page imports for routes
  import Home from "../Home/Home";
  import About from "../About/About";
  import LocalRecyclingCentres from '../RecyclingCentres/LocalRecyclingCentres';
  import WasteCollectionDates from '../WasteCollection/WasteCollectionDates';
  import WasteInformation from '../WasteCollection/WasteInformation';
  import WasteLocationInfo from '../WasteCollection/WasteLocationInfo.js';

//Bootstrap imports
import "bootstrap/dist/css/bootstrap.css";

//Navbar
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

//Container
import Container from "react-bootstrap/Container";
import BinInformation from '../WasteCollection/BinInformation';

function App() {
  //Get postcodes
  const [postcodeList, setPostcodesList] = useState([
    {
      postcode: "",
      catchmentarea: "",
      location: { lat: 0, lng: 0},
      bincolours: [],
      bins: [
        {
          bincolour: "",
          description: "",
          qrcode: "",
          daysbetween: 0,
          accepteditems: [],
        },
      ],
    },
  ]);

  useEffect(() => {
    async function getPostcodesList() {
      const res = await fetch('https://waste-management-api-c.herokuapp.com/postcode-waste-information');
      const data = await res.json();
      setPostcodesList(data);
      //console.log(data);
    }
    getPostcodesList();
  }, []);
  
  const [recyclingCentres, setRecyclingCentres] = useState([
    {
      postcode: "",
      name: "",
      catchmentarea: "",
      location: { lat: 0, lng: 0},
    },
  ]);

  useEffect(() => {
    async function getRecyclingCentres() {
      const res = await fetch('https://waste-management-api-c.herokuapp.com/recycling-centres');
      const data = await res.json();
      setRecyclingCentres(data);
      //console.log(data);
    }
    getRecyclingCentres();
  }, []);
  
  

  return (
    <div>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light">
          <Container>
          <Navbar.Brand href="/">Waste Management Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/local-recycling-centres">Local Recycling Centres</Nav.Link>
              <Nav.Link href="/waste-information">Waste Information</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='about' element={<About postcodes={postcodeList}/>}/>

          <Route path='local-recycling-centres' element={<LocalRecyclingCentres postcodes={postcodeList} centres={recyclingCentres}/>}/>

          <Route path='waste-information' element={<WasteInformation/>}>
            <Route index element={<WasteCollectionDates postcodes={postcodeList} />}/>
            <Route path=":postcode" element={<WasteLocationInfo />}/>
            <Route path=":postcode/:colour" element={<BinInformation />}/>
          </Route>
        </Routes>
    </div>
      

  );
}

export default App;
