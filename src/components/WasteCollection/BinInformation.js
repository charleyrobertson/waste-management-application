import React, { useState, useEffect, useCallback } from 'react';
import {  useParams, useNavigate, useSearchParams } from "react-router-dom";
import { saveAs } from 'file-saver';

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.css";
import { Button, ListGroup } from 'react-bootstrap';


export default function BinInformation()
{
    let params = useParams();
    let navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    let postcode = params.postcode;
    let colour = params.colour;
    let fetchURL = "https://waste-management-api-c.herokuapp.com/postcode-waste-information/" + postcode;
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

      //console.log(postcodeInfo);   
      const [bin, setBin] = useState([
        {
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

      useEffect(() => {
          if(postcodeInfo.bins)
          {
            for(let i = 0; i<postcodeInfo.bincolours.length; i++)
            {
                if(postcodeInfo.bins[i].bincolour === colour)
                {
                  setBin(postcodeInfo.bins[i]);
                  
                }
            }
          }
      }, [postcodeInfo.bins])

      console.log(bin);

      const downloadImage = () => {
        saveAs('https://i.postimg.cc/jjCH6T1f/Untitled.png', 'QRCode')
      }

    return (
        <div className='text-center'>
        <h1>Waste Bin Information</h1>
        <p>Please click the button to download the QR code that you can attach to your {bin.bincolour} waste bin!</p>
        <Button variant='secondary' onClick={downloadImage}>Download QR Code</Button>
        &nbsp;
        <Button 
          variant='secondary' 
          onClick={() => {navigate("/waste-information/" + postcodeInfo.postcode)
          }}>
          Back
          </Button>

          <h2>This information is for the {bin.bincolour} or {bin.description} bin.</h2>

          <br/>

            
          <label for="itemsinput">Search for an item:</label>
                &nbsp;
                <input 
                id='itemsinput'
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
          
          <ListGroup variant='flush'>
          <ListGroup.Item>You can put the following in this waste bin:</ListGroup.Item>

          {bin.accepteditems && bin.accepteditems.filter((itm) => {
                        let filter = searchParams.get("filter");
                        if(!filter) return true;
                        console.log(filter)
                        let item = itm.toLowerCase();
                        return item.startsWith(filter.toLowerCase());
                      })
                      .map((val) => (
                        <ListGroup.Item>{val}</ListGroup.Item>
                      ))}
          </ListGroup>
             
    </div>
    )
}