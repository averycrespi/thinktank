import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header = () => (
  <Navbar bg="primary" expand="lg" sticky="top">
    <Container fluid className="justify-content-center">
      <Navbar.Brand className="text-light">
        <h1 className="thinktank">Thinktank</h1>
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
