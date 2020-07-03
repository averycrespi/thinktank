import "../../styles/board.css";

import { G, Player } from "../../logic";

import { BoardProps } from "boardgame.io";
import Controller from "./Controller";
import React from "react";

interface LocalBoardProps extends BoardProps {
  G: G;
}

/** Render the game board. */
const Board = ({ G, ctx, moves, playerID }: LocalBoardProps) => {
  const player = ctx.currentPlayer as Player;
  const turn = playerID as Player;
  const gameover = ctx.gameover;
  const enabled = player === turn && !gameover;

  return (
    <div id="board">
      <Controller
        enabled={enabled}
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
