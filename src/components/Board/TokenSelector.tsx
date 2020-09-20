import { Player, Token, isTank } from "../../logic";

import React from "react";
import TokenIcon from "./TokenIcon";
import { colorOf } from "../../utils/colorOf";

interface TokenSelectorProps {
  readonly isActive: boolean;
  readonly player: Player;
  readonly hand: Array<Token>;
  readonly selected?: Token;
  onTokenSelect(token: Token): void;
}

const TokenSelector = ({
  isActive,
  player,
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
    // Always show tanks when the selector is active.
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
        <span className={colorOf(player)}>
          <TokenIcon token={token} />
        </span>
        {" (" + count + ")"}
      </button>
    );
  }
  return <div>{div}</div>;
};

export default TokenSelector;
