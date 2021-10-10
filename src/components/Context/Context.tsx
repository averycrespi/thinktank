import React from "react";
import { nameOf, opponentOf, Player } from "../../logic/player";
import { Token } from "../../logic/token";
import Title from "../Title/Title";
import TokenIcon from "../TokenIcon/TokenIcon";
import "./Context.css";

const playerClasses = (player: Player) =>
  [
    "token",
    player === Player.One ? "player-one" : "",
    player === Player.Two ? "player-two" : "",
  ].filter((c) => c.length > 0);

interface ContextProps {
  player: Player;
  isActive: boolean;
  winner: Player | null;
}

/* Renders the context of a match. */
const Context = ({ player, isActive, winner }: ContextProps) => {
  const turnOf = isActive ? player : opponentOf(player);

  return (
    <div className="context">
      <h1 className="context-title">
        <Title />
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

export default Context;
