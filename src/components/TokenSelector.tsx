import { faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Player } from "../logic/player";
import { HeldToken, toHeld, Token } from "../logic/token";
import TokenIcon from "./TokenIcon";

const SELECTABLE = [
  Token.Blocker,
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
  Token.CardinalInfiltrator,
  Token.DiagonalInfiltrator,
  Token.Mine,
];

const tokenClasses = (currentPlayer: Player): Array<String> =>
  [
    "token",
    currentPlayer === Player.One ? "player-one" : "",
    currentPlayer === Player.Two ? "player-two" : "",
  ].filter((c) => c.length > 0);

interface TokenSelectorProps {
  currentPlayer: Player;
  hand: Array<HeldToken>;
  disabled?: boolean;
  submitDisabled?: boolean;
  undoDisabled?: boolean;
  handleTokenSelect(token: Token): void;
  handleSubmit(): void;
  handleUndo(): void;
}

/** Renders a token selector. */
const TokenSelector = ({
  currentPlayer,
  hand,
  disabled,
  submitDisabled,
  undoDisabled,
  handleTokenSelect,
  handleSubmit,
  handleUndo,
}: TokenSelectorProps) => (
  <div className="token-selector">
    {SELECTABLE.map((token, i) => (
      <button
        className={tokenClasses(currentPlayer).join(" ")}
        disabled={disabled || !hand.includes(toHeld(token))}
        key={i}
        onClick={() => handleTokenSelect(token)}
        onKeyDown={() => handleTokenSelect(token)}
      >
        <TokenIcon token={token} />
      </button>
    ))}
    <button
      className="token submit"
      disabled={disabled || submitDisabled}
      onClick={() => handleSubmit()}
      onKeyDown={() => handleSubmit()}
      title="Submit"
    >
      <FontAwesomeIcon icon={faCheck} />
    </button>
    <button
      className="token undo"
      disabled={disabled || undoDisabled}
      onClick={() => handleUndo()}
      onKeyDown={() => handleUndo()}
      title="Undo"
    >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  </div>
);

export default TokenSelector;
