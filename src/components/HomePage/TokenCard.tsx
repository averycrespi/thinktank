import React from "react";
import { Card } from "react-bootstrap";
import { Token } from "../../logic/token";
import TokenIcon from "../TokenIcon";

interface TokenCardProps {
  token: Token;
  title: string;
  description: Array<string>;
  movement: string;
  vulnerabilities: string;
}

const TokenCard = ({
  token,
  title,
  description,
  movement,
  vulnerabilities,
}: TokenCardProps) => (
  <Card className="p-3">
    <Card.Title>
      <h3>
        <TokenIcon token={token} /> {title}
      </h3>
    </Card.Title>
    <Card.Subtitle>
      <h5>Description</h5>
    </Card.Subtitle>
    {description.map((line) => (
      <Card.Text>{line}</Card.Text>
    ))}
    <Card.Subtitle>
      <h5>Movement</h5>
    </Card.Subtitle>
    <Card.Text>{movement}</Card.Text>
    <Card.Subtitle>
      <h5>Vulnerabilities</h5>
    </Card.Subtitle>
    <Card.Text>{vulnerabilities}</Card.Text>
  </Card>
);

export default TokenCard;
