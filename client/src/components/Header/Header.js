import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { Routes, Route, Link } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import CreateFundForm from '../../pages/CreateFundForm/CreateFundForm'

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Forcible Donation Crowdfund</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/create-fund">Create Fund</Nav.Link>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create-fund" element={<CreateFundForm />} />
        </Routes>
      </div>
    </header>
  )
}

export default Header