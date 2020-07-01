import Controller from "./Controller";
import React from "react";

interface BoardProps {
  readonly G: any;
  readonly ctx: any;
  readonly moves: any;
}

const Board = ({ G, ctx, moves }: BoardProps) => {
  return (
    <div id="board">
      <Controller
        pieces={G.pieces}
        hand={G.hands.get(ctx.currentPlayer)!}
        player={ctx.currentPlayer}
        moves={moves}
      />
    </div>
  );
};

export default Board;
