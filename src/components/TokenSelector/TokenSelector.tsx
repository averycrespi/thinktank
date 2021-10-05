import { faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Player } from "../../logic/player";
import { HeldToken, toHeld, Token } from "../../logic/token";
import TokenIcon from "../TokenIcon/TokenIcon";
import "./TokenSelector.css";

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

const tokenClasses = (player: Player): Array<String> =>
  [
    "token",
    player === Player.One ? "player-one" : "",
    player === Player.Two ? "player-two" : "",
  ].filter((c) => c.length > 0);

interface TokenSelectorProps {
  player: Player;
  hand: Array<HeldToken>;
  canSelect: Boolean;
  canSubmitOrUndo: boolean;
  handleTokenSelect(token: Token): void;
  handleSubmit(): void;
  handleUndo(): void;
}

/** Renders a token selector. */
const TokenSelector = ({
  player,
  hand,
  canSelect,
  canSubmitOrUndo,
  handleTokenSelect,
  handleSubmit,
  handleUndo,
}: TokenSelectorProps) => (
  <div className="token-selector">
    {SELECTABLE.map((token, i) => (
      <button
        className={tokenClasses(player).join(" ")}
        disabled={!canSelect || !hand.includes(toHeld(token))}
        key={i}
        onClick={() => handleTokenSelect(token)}
        onKeyDown={() => handleTokenSelect(token)}
      >
        <TokenIcon token={token} />
      </button>
    ))}
    <button
      className="token submit"
      disabled={!canSubmitOrUndo}
      onClick={() => handleSubmit()}
      onKeyDown={() => handleSubmit()}
      title="Submit"
    >
      <FontAwesomeIcon icon={faCheck} />
    </button>
    <button
      className="token undo"
      disabled={!canSubmitOrUndo}
      onClick={() => handleUndo()}
      onKeyDown={() => handleUndo()}
      title="Undo"
    >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  </div>
);

export default TokenSelector;
