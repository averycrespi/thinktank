import React from "react";
import { Token } from "../logic";

interface SelectorProps {
  onTokenSelect(token: Token): void;
}

const Selector = ({ onTokenSelect }: SelectorProps) => {
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
      <button key={token} onClick={() => onTokenSelect(token as Token)}>
        {token}
      </button>
    );
  }
  return <div>{div}</div>;
};

export default Selector;
