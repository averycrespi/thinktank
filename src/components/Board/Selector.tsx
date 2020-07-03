import React from "react";
import { Token } from "../../logic";

interface SelectorProps {
  readonly hand: Array<Token>;
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
        disabled={!hand.includes(token)}
        onClick={() => onTokenSelect(token)}
      >
        {token + " (" + hand.filter((t) => t === token).length + ")"}
      </button>
    );
  }
  return <div>{div}</div>;
};

export default Selector;
