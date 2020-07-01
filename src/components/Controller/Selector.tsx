import { SimpleToken, Token, simplify } from "../../logic";

import React from "react";

interface SelectorProps {
  readonly hand?: Map<SimpleToken, number>;
  onTokenSelect(token: Token): void;
}

const Selector = ({
  hand = new Map<SimpleToken, number>(),
  onTokenSelect,
}: SelectorProps) => {
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
        disabled={!hand.get(simplify(token))}
        onClick={() => onTokenSelect(token)}
      >
        {token + " (" + (hand.get(simplify(token)) ?? 0) + ")"}
      </button>
    );
  }
  return <div>{div}</div>;
};

export default Selector;
