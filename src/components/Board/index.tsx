import { G, Player } from "../../logic";

import Controller from "./Controller";
import { Ctx } from "boardgame.io";
import React from "react";

interface BoardProps {
  readonly G: G;
  readonly ctx: Ctx;
  readonly moves: any;
  readonly playerID: string;
}

const Board = ({ G, ctx, moves, playerID }: BoardProps) => {
  const currentPlayer = ctx.currentPlayer as Player;
  return (
    <div id="board">
      <Controller
        cells={G.cells}
        hand={G.hands[currentPlayer]}
        player={currentPlayer}
        moves={moves}
        enabled={currentPlayer === playerID}
      />
    </div>
  );
};

export default Board;
