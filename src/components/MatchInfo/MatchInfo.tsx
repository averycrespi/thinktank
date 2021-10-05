import React from "react";
import { nameOf, opponentOf, Player } from "../../logic/player";
import { Token } from "../../logic/token";
import Title from "../Title/Title";
import TokenIcon from "../TokenIcon/TokenIcon";
import "./MatchInfo.css";

interface MatchInfo {
  player: Player;
  isActive: boolean;
  winner: Player | null;
}

const playerClasses = (player: Player) =>
  [
    "token",
    player === Player.One ? "player-one" : "",
    player === Player.Two ? "player-two" : "",
  ].filter((c) => c.length > 0);

/* Renders information about a match. */
const MatchInfo = ({ player, isActive, winner }: MatchInfo) => {
  const turnOf = isActive ? player : opponentOf(player);

  return (
    <div className="match-info">
      <h1 className="match-info-title">
        <Title />
      </h1>
      <div className="match-info-item">
        <p>You are:</p>
        <div className={playerClasses(player).join(" ")}>
          <TokenIcon token={Token.Base} />
        </div>
      </div>
      <div className="match-info-item">
        <p>Turn of:</p>
        <div className={playerClasses(turnOf).join(" ")}>
          <TokenIcon token={Token.Base} />
        </div>
      </div>
      {winner && <p>Winner: {nameOf(winner)}</p>}
    </div>
  );
};

export default MatchInfo;
