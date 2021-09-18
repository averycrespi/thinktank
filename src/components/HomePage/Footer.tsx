import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";

const Footer = () => (
  <Navbar bg="dark" expand="lg" fixed="bottom">
    <Container fluid className="justify-content-center">
      <Row>
        <Col xs={12} sm={"auto"}>
          <Button
            variant="secondary"
            className="m-1 text-nowrap"
            href="/sandbox"
          >
            Open Sandbox
          </Button>
        </Col>
        <Col xs={12} sm={"auto"}>
          <Button variant="primary" className="m-1 text-nowrap" href="/create">
            Create Game
          </Button>
        </Col>
        <Col xs={12} sm={"auto"}>
          <Button variant="primary" className="m-1 text-nowrap" href="join">
            Join Game
          </Button>
        </Col>
      </Row>
    </Container>
  </Navbar>
);

export default Footer;
