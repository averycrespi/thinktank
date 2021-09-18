import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const Rules = () => (
  <Card className="p-3">
    <Card.Title>
      <h3>Rules</h3>
    </Card.Title>
    <Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem>
          On your turn, you may <b>place</b> a piece from your hand, <b>move</b>{" "}
          a piece, or <b>rotate</b> a tank.
        </ListGroupItem>
        <ListGroupItem>
          You can only place pieces in your <b>spawn area</b>, and pieces cannot
          enter either player's <b>home area</b>.
        </ListGroupItem>
        <ListGroupItem>
          When a piece is <b>shot</b> by a tank or <b>exploded</b> by a mine, it
          returns to the hand of its owner.
        </ListGroupItem>
        <ListGroupItem>
          When a piece is <b>captured</b> by an infiltrator, it remains on the
          board but changes ownership.
        </ListGroupItem>
        <ListGroupItem>
          When taking your turn, you cannot allow any of your pieces (except
          mines) to be captured, shot, or exploded.
        </ListGroupItem>
        <ListGroupItem>
          The game ends when either player's base is destroyed or captured.
        </ListGroupItem>
      </ListGroup>
    </Card.Body>
  </Card>
);

export default Rules;
