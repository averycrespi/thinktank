import React from "react";
import { Token } from "../../logic";
import TokenIcon from "./TokenIcon";

interface TokenSelectorProps {
  readonly hand: Array<Token>;
  onTokenSelect(token: Token): void;
}

/** Render a token selector. */
const TokenSelector = ({ hand, onTokenSelect }: TokenSelectorProps) => {
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
    const count = hand.filter((t) => t === token).length;
    div.push(
      <button
        key={token}
        disabled={!hand.includes(token)}
        onClick={() => onTokenSelect(token)}
      >
        <TokenIcon token={token} />
        {" (" + count + ")"}
      </button>
    );
  }
  return <div>{div}</div>;
};

export default TokenSelector;
