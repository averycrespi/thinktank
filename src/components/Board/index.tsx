import { G, Player } from "../../logic";

import Controller from "./Controller";
import { Ctx } from "boardgame.io";
import React from "react";

interface BoardProps {
  readonly G: G;
  readonly ctx: Ctx;
  readonly moves: any;
}

const Board = ({ G, ctx, moves }: BoardProps) => {
  const player = ctx.currentPlayer as Player;
  return (
    <div id="board">
      <Controller
        cells={G.cells}
        hand={G.hands.get(player)!}
        player={player}
        moves={moves}
      />
    </div>
  );
};

export default Board;
