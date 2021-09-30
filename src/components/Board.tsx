import React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "../logic/state";
import MatchController from "./MatchController";
import { opponentOf, Player } from "../logic/player";

interface LocalBoardProps extends BoardProps {
  G: GameState;
}

/** Wraps a board. */
const Board = ({ G, ctx, moves, isActive }: LocalBoardProps) => {
  const player = ctx.currentPlayer as Player;
  const activePlayer = isActive ? player : opponentOf(player);

  return (
    <MatchController
      state={G}
      player={player}
      activePlayer={activePlayer}
      place={moves.place}
      move={moves.move}
      rotate={moves.rotate}
    />
  );
};

export default Board;
