import React from 'react';

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSearchParams } from 'react-router-dom';

export default function About({postcodes}) {
    let [searchParams, setSearchParams] = useSearchParams();
    console.log(postcodes);

    return (
        <div>
            <div>
                <br/>
                <h1 className="text-center">About this Website</h1>

                <p className='text-center'>
                   This page will provide some background information on why this application has been created
                   and the kind of things that you can do to reduce your waste and reduce the amount of emissions
                   you create.
                </p>
            </div>

            <Container className="container-fluid">
                <Card className="text-center">
                <Card.Header>Climate Crisis | Climate Change</Card.Header>
                <Card.Body>
                    <Card.Title>Learn about Climate Change</Card.Title>
                    <Card.Text>
                    Climate change refers to the consistent change in temperatures and the weather - whilst some of these
                    changes are natural and have been happening for millions of years. There are some changes in the recent years
                    that have been proven to be caused by the amount of emissions that humans give off from doing "neccessities".
                    <br/>
                    <br/>
                    There will be some extreme consequences if the amount of emissions aren't reduced by countries taking a large effort
                    to reduce the amount of emissions that are given off each year. Some of the consequences include: extreme droughts, enviromental
                    degration, rising sea levels and more.
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">References: https://www.un.org/en/climatechange/what-is-climate-change</Card.Footer>
                </Card>

                <br/>

                <Card className="text-center">
                <Card.Header>Reduce | Re-use | Recycle</Card.Header>
                <Card.Body>
                    <Card.Title>Learn how to Reduce and Recycle</Card.Title>
                    <Card.Text>
                    Reducing the amount of waste that you create within your household means that you are
                    using less resources that could then create emissions whilst being destroyed in landfill.
                    It can be quite simple to reduce the amount of single-use items that you need on a daily basis
                    by upgrading to a re-usable sturdy version. For Example: taking a reusable coffee cup rather than opting
                    for a disposable one each day - this could save 365 coffee cups a year from going to landfill and contributing to pollution.
                    <br/>
                    <br/>
                    Whilst it can be easy to dramatically reduce the amount of waste that you create, it is impoissible
                    to live a completely waste-free lifestyle without dedication. Thankfully, recycling allows us to use
                    some single-use items without creating the same impact on the enviroment that putting them in landfill would.
                    Items that are single-use can often be melted down and re-manufactured into the same item again meaning that 
                    one singular use item could be used over and over again.
                    <br/>
                    <br/>
                    This application will give you information about how to recycle your household waste so that you can begin
                    creating a positive impact on the current climate crisis and make your very own attempt at starting to reverse
                    the damage that has been caused.
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">References: https://www.reducereuserecycle.co.uk/</Card.Footer>
                </Card>

                <br/>

                <Card className="text-center">
                <Card.Header>Change | Postcode Checker</Card.Header>
                <Card.Body>
                    <Card.Title>What use this Application?</Card.Title>
                    <Card.Text>
                    Many countries are doing their part to help reduce the amount of emissions that are given off every year, Scotland have introduced
                    recycling methods by ensuring that all potentially recycled waste is non-contaminated and split into very specific waste bins so that
                    when they are collected to go to the recycling centres all of the waste can be recycled in the correct manner. 
                    <br/>
                    <br/>
                    With the coloured waste bins that have been given in many local catchment areas, some even having up to 5-6 different coloured bins,
                    it can often cause confusion to what can actually be put in which bin. This application will allow users to scan a QR code on a specific 
                    coloured bin which will provide them with the correct information on how to dispose of the waste that they currently have which could potentially
                    lead to a higher percentage of recycling done in each catchment area.
                    <br/>
                    <br/>
                    Check your postcode by entering it in the search box to see if your area has been implemented into the application.
                    <br/>
                    <label for="postcodeChecker">Enter your postcode:</label>
                    &nbsp;
                    <input 
                        id='postcodeChecker'
                        value={searchParams.get("filter") || ""}
                        onChange={event => {
                        let filter = event.target.value;
                        if(filter) {
                            setSearchParams({filter});
                        } else {
                            setSearchParams({});
                        }
                        }} 
                    />
                    <br/>
                    <>The following postcodes work: </>
                    {postcodes.filter((postcodes) => {
                        let filter = searchParams.get("filter");
                        if(!filter) return true;
                        let postcode = postcodes.postcode.toLowerCase();
                        return postcode.startsWith(filter.toLowerCase());
                    })
                    .map(postcode => (
                        <>{postcode.postcode} - </> 
                    ))}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">More postcode functionality coming soon...</Card.Footer>
                </Card>
                <br/>
            </Container>
        </div>
    );
}