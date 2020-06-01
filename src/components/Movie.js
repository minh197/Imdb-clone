import React, { useState } from 'react'
import { Card, ListGroup, Navbar, Nav, Form, FormControl, Button, ListGroupItem, Row, Col, Container, Dropdown,Jumbotron } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css'


export default function Movie(props) {
    // let [keyword,setKeyword] = useState('')
    let keyword = ''
    const searchBtn = (e) => {
        e.preventDefault();

        console.log("whats the search term", keyword)
        props.topSearch(keyword);
    }
    let htmlMovie = props.myMovieList.map((movie) => {
        let myMovie = movie;
        return (


            


                <Card className="col-md-6 col-lg-4 p-3 card  ">
                    <div data-test="container" class="container">
                        <div class="view overlay zoom" data-test="view">
                            <Card.Img onClick={() => props.modalIsOpen(movie.id)} variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`} />
                        </div>

                        <div class="card mb-5 box-shadow">

                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    {movie.overview}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Vote average: {movie.vote_average}</ListGroupItem>
                                <ListGroupItem>Release Date: {movie.release_date}</ListGroupItem>
                                <ListGroupItem>Popularity: {movie.popularity}</ListGroupItem>
                            </ListGroup>
                           
                            <Card.Body>


                            </Card.Body>
                        </div>

                    </div>
                </Card>
            





        )
    })
    return (
        <div class="container-fluid sm">
            
                <nav class="fixed-top navbar navbar-expand-lg navbar-dark bg-dark " >
                    <Navbar bg="dark" expand="lg">
                        <Navbar.Brand href="#home" onClick={() => props.comeBack()}>HuFilm</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                            <Nav className="mr-auto">
                                <Nav.Link href="#home" onClick={() => props.onNewRelease()}>Latest</Nav.Link>
                                <Nav.Link href="#link" onClick={() => props.topList()}>Top Rated</Nav.Link>
                                <Dropdown>
                                    <Dropdown.Toggle href="#Ratting" variant="dark" id="dropdown-basic">
                                        Ratting
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1" onClick={() => props.lowToHigh()}>Lowest to Highest</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2 " onClick={() => props.highToLow()}>Highest to Lowest</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>


                                <Dropdown>
                                    <Dropdown.Toggle href="#Ratting" variant="dark" id="dropdown-basic">
                                        Popularity
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1" onClick={() => props.lowPop()}>Lowest to Highest</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2 " onClick={() => props.highPop()}>Highest to Lowest</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>

                            </Nav>
                            <Form inline onSubmit={(e) => searchBtn(e)}>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2 form-control" onChange={(e) => keyword = e.target.value} />
                                <Button variant="outline-info" type="submit">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </nav>
            <section>
            <div className="Minh-wrapper">
                <Jumbotron fluid>
                <div class="bg-img">
                    <div class="content-wrapper">
                    <Container>
                        
                        
                    
                    </Container>
                    </div>
                </div>
                </Jumbotron>
            </div>
            </section>
            <div className="d-flex flex-wrap main justify-content-center">
                <Container>

                    <Col>

                        <Row></Row>
                        <Row xs={12}>{htmlMovie}</Row>
                        <Row></Row>

                    </Col>
                </Container>





            </div>
           

           
        </div>)

}
