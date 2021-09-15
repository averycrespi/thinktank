import React from "react";
import { Player } from "../../logic/player";
import { HeldToken, toHeld, Token } from "../../logic/token";
import { colorOf } from "../../utils/colorOf";
import TokenIcon from "./TokenIcon";

interface TokenSelectorProps {
  readonly isActive: boolean;
  readonly player: Player;
  readonly hand: Array<HeldToken>;
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
    Token.CardinalInfiltrator,
    Token.DiagonalInfiltrator,
    Token.Mine,
  ];
  for (const token of tokens) {
    // Always show tanks when the selector is active.
    const held = toHeld(token);
    const disabled =
      !isActive || (!hand.includes(held) && held !== HeldToken.Tank);
    const count = hand.filter((t) => t === toHeld(token)).length;
    div.push(
      <button
        key={token}
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
