import React from 'react';
import { useNavigate } from 'react-router-dom';

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';

export default function Home() {
    let navigate = useNavigate();
    return (
        <div>
            <br />
             <div>
                <Container className="container-fluid">
                <Row xs={1} md={2} className="g-4">
                    <Col>
                    <Card className='text-center'>
                    <Card.Img variant="top" alt ="Recycling" width="100%" height="100%" src="https://i.postimg.cc/VLgNPDpd/sigmund-a-I4-RJ-Mw4-I-unsplash.jpg" />
                    <Card.Body>
                        <Card.Title>Recycling</Card.Title>
                        <Card.Text>
                        Recycling will dramatically increase the odds of the survival of this planet and will contribute to climate change. To find how to do this, please visit our waste information page!
                        </Card.Text>
                        <Button variant="secondary" onClick={() => {navigate("/waste-information")}}>Go to Waste Information</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card className='text-center'>
                    <Card.Img variant="top" alt="Reducing Waste" width="100%" height="100%" src="https://i.postimg.cc/50Zm187R/alexander-schimmeck-Yp-Ohh-VGPky-Q-unsplash.jpg" />
                    <Card.Body>
                        <Card.Title>Reducing Waste</Card.Title>
                        <Card.Text>
                        Recuding the waste that we produce within our households will prevent so much waste going to landfill and causing pollution. To find out more, go to the about page!
                        </Card.Text>
                        <Button variant="secondary" onClick={() => {navigate("/about")}}>Go to About</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card className='text-center'>
                    <Card.Img variant="top" alt="Climate Crisis" width="100%" height="100%" src="https://i.postimg.cc/3xCp0XkG/matt-palmer-Btle-FKDv-N2-Q-unsplash.jpg" />
                    <Card.Body>
                        <Card.Title>Climate Crisis</Card.Title>
                        <Card.Text>
                        Climate crisis is directly affected by your recycling habits. See how you can change your habits in the about page.
                        </Card.Text>
                        <Button variant="secondary" onClick={() => {navigate("/about")}}>Go to About</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card className='text-center'>
                    <Card.Img variant="top" alt="Bins" width="100%" height="100%" src="https://i.postimg.cc/W34Mvdbk/pawel-czerwinski-Rk-Isy-D-AVvc-unsplash.jpg" />
                    <Card.Body>
                        <Card.Title>Local Recycling Centres</Card.Title>
                        <Card.Text>
                        There will be local recycling centres in your local catchment area that you can use! Go to the page to find directions to the one closest to you!
                        </Card.Text>
                        <Button variant="secondary" onClick={() => {navigate("/local-recycling-centres")}}>Go to Local Recycling Centres</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                    </Row>
                </Container>
            </div>
        </div>
        
   );
      
    }
  

