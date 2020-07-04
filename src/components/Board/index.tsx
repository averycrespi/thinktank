import "../../styles/board.css";

import { G, Player, Result } from "../../logic";

import { BoardProps } from "boardgame.io";
import Controller from "./Controller";
import React from "react";

interface LocalBoardProps extends BoardProps {
  G: G;
}

/** Render the game board. */
const Board = ({ G, ctx, moves, isActive }: LocalBoardProps) => {
  const player = ctx.currentPlayer as Player;
  const gameover = ctx.gameover as Result;

  return (
    <div id="board">
      <Controller
        isActive={isActive}
        cells={G.cells}
        hand={G.hands[player]}
        player={player}
        placePiece={moves.placePiece}
        movePiece={moves.movePiece}
      />
      {gameover && <p>{gameover.winner + " wins!"}</p>}
    </div>
  );
};

export default Board;
