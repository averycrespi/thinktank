import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Token } from "../../logic/token";
import Header from "../Header";
import Footer from "./Footer";
import Rules from "./Rules";
import TokenCard from "./TokenCard";

interface HomePageProps {
  serverURL: string;
}

const HomePage = ({ serverURL }: HomePageProps) => (
  <div>
    <Header />
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="my-3 p-3">
            <Card.Body>
              <p>
                Thinktank is a 2-player strategy game inspired by{" "}
                <a href="https://spriteworx.wixsite.com/website-4">Conundrum</a>
                .
              </p>
              <p>
                On your turn, you can place a piece, move a piece, or rotate a
                tank. You win the game by destroying or capturing your
                opponent's base. But there's a catch:{" "}
                <em>you can't sacrifice your own pieces!</em>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <Rules />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <TokenCard
            token={Token.Blocker}
            title="Blocker"
            description={["Blocks shots from enemy tanks."]}
            movement="Moves 1 space in any direction."
            vulnerabilities="Can be captured. Cannot be shot or exploded."
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <TokenCard
            token={Token.UpTank}
            title="Tank"
            description={[
              "Shoots all enemy pieces in the direction it is facing.",
              "Can shoot through your own pieces (including blockers).",
            ]}
            movement="Moves 1 space horizontally or vertically. Can be rotated."
            vulnerabilities="Can be captured, shot, or exploded."
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <TokenCard
            token={Token.CardinalInfiltrator}
            title="Cardinal Infiltrator"
            description={[
              "Captures all enemy pieces in the 8 adjacent spaces.",
              "Cannot capture pieces that are adjacent to an enemy infiltrator.",
            ]}
            movement="Moves 1 space horizontally or vertically."
            vulnerabilities="Can be shot or exploded. Cannot be captured."
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <TokenCard
            token={Token.DiagonalInfiltrator}
            title="Diagonal Infiltrator"
            description={[
              "Captures all enemy pieces in the 8 adjacent spaces.",
              "Cannot capture pieces that are adjacent to an enemy infiltrator.",
            ]}
            movement="Moves 1 space diagonally."
            vulnerabilities="Can be shot or exploded. Cannot be captured."
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <TokenCard
            token={Token.Mine}
            title="Mine"
            description={[
              "Destroys all friendly and enemy pieces (including itself) in the 8 adjacent squares when it explodes.",
              "Explodes when shot by an enemy tank or adjacent to an enemy piece (except a blocker).",
              "You may move a mine to a space where it will explode, as long as no other friendly pieces are harmed.",
            ]}
            movement="Moves 2 spaces in any direction. Can jump over other pieces."
            vulnerabilities="Can be shot or exploded. Cannot be captured."
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <TokenCard
            token={Token.Base}
            title="Base"
            description={["Protect this at all costs!"]}
            movement="Moves 1 space in any direction. Cannot leave the home area."
            vulnerabilities="Can be shot, exploded, or captured."
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-3">
          <p>
            Made with <FontAwesomeIcon icon={faHeart} /> by Avery Crespi.
          </p>
          <p>
            Explore the code on <FontAwesomeIcon icon={faGithub} />{" "}
            <a href="https://github.com/averycrespi/thinktank">GitHub</a>.
          </p>
        </Col>
      </Row>
    </Container>
    <Footer />
  </div>
);

export default HomePage;
