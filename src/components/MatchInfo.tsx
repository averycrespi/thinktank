import React from "react";
import { nameOf, opponentOf, Player } from "../logic/player";

interface MatchInfo {
  player: Player;
  isActive: boolean;
  winner: Player | null;
}

/* Renders information about a match. */
const MatchInfo = ({ player, isActive, winner }: MatchInfo) => (
  <div className="match-info">
    <h1 className="title">thinktank</h1>
    <p>You are: {nameOf(player)}</p>
    <p>Turn of: {isActive ? nameOf(player) : nameOf(opponentOf(player))}</p>
    {winner && <p>Winner: {nameOf(winner)}</p>}
  </div>
);

export default MatchInfo;
