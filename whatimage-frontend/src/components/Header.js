import React from 'react'
import {Container,Navbar,Nav} from 'react-bootstrap'


function Header() {

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                        <Navbar.Brand href="/">Image Classification</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="https://github.com/abdulazizashurov/image-classification"><i className="fas fa-source"></i>Source Code</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </header>
    )
}

export default Header
