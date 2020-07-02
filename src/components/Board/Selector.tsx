import { Hand, Token } from "../../logic";

import React from "react";

interface SelectorProps {
  readonly hand: Hand;
  onTokenSelect(token: Token): void;
}

const Selector = ({ hand, onTokenSelect }: SelectorProps) => {
  const div = [];
  const tokens = [
    Token.Blocker,
    Token.UpTank,
    Token.DownTank,
    Token.LeftTank,
    Token.RightTank,
    Token.OrthogonalInfiltrator,
    Token.DiagonalInfiltrator,
    Token.Mine,
  ];
  for (const token of tokens) {
    div.push(
      <button
        key={token}
        disabled={!hand.has(token)}
        onClick={() => onTokenSelect(token)}
      >
        {token + " (" + hand.count(token) + ")"}
      </button>
    );
  }
  return <div>{div}</div>;
};

export default Selector;
