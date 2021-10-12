import { faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Player } from "../../logic/player";
import { Hand } from "../../logic/state";
import { nameOf, toHeld, Token } from "../../logic/token";
import TokenIcon from "../TokenIcon/TokenIcon";
import "./HandView.css";

// Defines which tokens are selectable.
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

const tokenClasses = (
  player: Player,
  token: Token,
  selectedToken: Token | null
): Array<String> =>
  [
    "token",
    player === Player.One ? "player-one" : "",
    player === Player.Two ? "player-two" : "",
    token === selectedToken ? "selected" : "",
  ].filter((c) => c.length > 0);

interface HandViewProps {
  player: Player;
  isActive: Boolean;
  hand: Hand;
  canSelectToken: Boolean;
  handleTokenSelect(token: Token): void;
  canSubmitOrUndo: boolean;
  handleSubmit(): void;
  handleUndo(): void;
}

/** Renders a player's hand. */
const HandView = ({
  player,
  isActive,
  hand,
  canSelectToken,
  handleTokenSelect,
  canSubmitOrUndo,
  handleSubmit,
  handleUndo,
}: HandViewProps) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  return (
    <div className="hand">
      {SELECTABLE.map((token, i) => (
        <button
          className={tokenClasses(player, token, selectedToken).join(" ")}
          disabled={
            !isActive || !canSelectToken || !hand.includes(toHeld(token))
          }
          key={i}
          onClick={() => {
            setSelectedToken(token);
            handleTokenSelect(token);
          }}
          title={nameOf(token)}
        >
          <TokenIcon token={token} />
        </button>
      ))}
      <button
        className="token submit"
        disabled={!isActive || !canSubmitOrUndo}
        onClick={() => {
          setSelectedToken(null);
          handleSubmit();
        }}
        title="Submit"
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button
        className="token undo"
        disabled={!isActive || !canSubmitOrUndo}
        onClick={() => {
          setSelectedToken(null);
          handleUndo();
        }}
        title="Undo"
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
    </div>
  );
};

export default HandView;
