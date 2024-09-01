import React from "react";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import './AppLayout.style.css';

const AppLayout = () => {
    return (<div>
        <Navbar expand="lg" data-bs-theme={'dark'}
                className="px-5 bg-black navbar navbar-expand-lg navbar-light">
            <Container fluid>
                <Navbar.Brand href="#">
                    <a href={'/'}>
                        <span className={'me-4 navbar-brand'}>
                            <img
                                src={'https://noona-netflix-react-query.vercel.app/netflixLogoSvg.svg'}
                                alt={'logo'}
                                width={93}/>
                        </span>
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link className={'text-white me-4 link-offset-2 link-underline link-underline-opacity-0'} href="/">Home</Nav.Link>
                        <Nav.Link className={'text-white link-offset-2 link-underline link-underline-opacity-0'} href="/movies">Movies</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button className={'btn btn-outline-danger'} variant={'outline-danger'}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet/>
    </div>);
};

export default AppLayout;