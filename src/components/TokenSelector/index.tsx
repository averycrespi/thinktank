import { faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Player } from "../../logic/player";
import { HeldToken, toHeld, Token } from "../../logic/token";
import TokenIcon from "../TokenIcon";

interface TokenSelectorProps {
  player: Player;
  hand: Array<HeldToken>;
  handleTokenSelect(token: Token): void;
  handleSubmit(): void;
  handleUndo(): void;
}

const SELECTABLE = [
  Token.Blocker,
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
  Token.CardinalInfiltrator,
  Token.DiagonalInfiltrator,
  Token.Mine,
  Token.Base /* TODO: remove */,
];

const buttonClasses = (player: Player): Array<String> =>
  [
    "token-button",
    player === Player.One ? "player-one" : "",
    player === Player.Two ? "player-two" : "",
  ].filter((c) => c.length > 0);

/** Renders a token selector. */
const TokenSelector = ({
  player,
  hand,
  handleTokenSelect,
  handleSubmit,
  handleUndo,
}: TokenSelectorProps) => (
  <div className="token-selector">
    {SELECTABLE.map((token, i) => (
      <button
        className={buttonClasses(player).join(" ")}
        disabled={!hand.includes(toHeld(token))}
        key={i}
        onClick={() => handleTokenSelect(token)}
        onKeyDown={() => handleTokenSelect(token)}
      >
        <TokenIcon token={token} />
      </button>
    ))}
    <button
      className="token-button submit"
      onClick={() => handleSubmit()}
      onKeyDown={() => handleSubmit()}
      title="Submit"
    >
      <FontAwesomeIcon icon={faCheck} />
    </button>
    <button
      className="token-button undo"
      onClick={() => handleUndo()}
      onKeyDown={() => handleUndo()}
      title="Undo"
    >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  </div>
);

export default TokenSelector;
