import React from "react";
import { nameOf, opponentOf, Player } from "../../logic/player";
import { Token } from "../../logic/token";
import TitleView from "../TitleView/TitleView";
import TokenIcon from "../TokenIcon/TokenIcon";
import "./ContextView.css";

const playerClasses = (player: Player) =>
  [
    "token",
    player === Player.One ? "player-one" : "",
    player === Player.Two ? "player-two" : "",
  ].filter((c) => c.length > 0);

interface ContextViewProps {
  player: Player;
  isActive: boolean;
  winner: Player | null;
}

/* Renders the context of a match. */
const ContextView = ({ player, isActive, winner }: ContextViewProps) => {
  const turnOf = isActive ? player : opponentOf(player);

  return (
    <div className="context">
      <h1 className="context-title">
        <TitleView />
      </h1>
      <div className="context-item">
        <p>You are:</p>
        <div className={playerClasses(player).join(" ")}>
          <TokenIcon token={Token.Base} />
        </div>
      </div>
      <div className="context-item">
        <p>Turn of:</p>
        <div className={playerClasses(turnOf).join(" ")}>
          <TokenIcon token={Token.Base} />
        </div>
      </div>
      {winner && (
        <div className="context-item">
          <p>Winner: {nameOf(winner)}</p>
        </div>
      )}
    </div>
  );
};

export default ContextView;
