import { Token, isTank } from "../../logic";

import React from "react";
import TokenIcon from "./TokenIcon";

interface TokenSelectorProps {
  readonly isActive: boolean;
  readonly hand: Array<Token>;
  readonly selected?: Token;
  onTokenSelect(token: Token): void;
}

/** Render a token selector. */
const TokenSelector = ({
  isActive,
  hand,
  selected,
  onTokenSelect,
}: TokenSelectorProps) => {
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
    // Tanks can be rotated, so never disable their buttons.
    const disabled = !isActive || (!hand.includes(token) && !isTank(token));
    const count = hand.filter((t) => t === token).length;
    div.push(
      <button
        key={token}
        title={token}
        disabled={disabled}
        className={selected === token ? "btn-primary" : ""}
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
