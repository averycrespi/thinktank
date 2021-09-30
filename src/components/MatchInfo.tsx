import React from "react";
import { nameOf, Player } from "../logic/player";

interface MatchInfo {
  player: Player;
  activePlayer: Player;
}

/* Renders information about a match. */
const MatchInfo = ({ player, activePlayer }: MatchInfo) => (
  <div className="match-info">
    <h1 className="title">thinktank</h1>
    <p>You are: {nameOf(player)}</p>
    <p>Turn of: {nameOf(activePlayer)}</p>
  </div>
);

export default MatchInfo;
