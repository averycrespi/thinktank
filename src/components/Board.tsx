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
  // TODO: fix this hack
  const currentPlayer = ctx.currentPlayer as Player;
  const player = isActive ? currentPlayer : opponentOf(currentPlayer);

  return (
    <MatchController
      state={G}
      player={player}
      isActive={isActive}
      place={moves.place}
      move={moves.move}
      rotate={moves.rotate}
    />
  );
};

export default Board;
