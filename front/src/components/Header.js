import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
        <Nav.Link href="/predecir">Predecir</Nav.Link>
        <Nav.Link href="/metricas">Metricas</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header