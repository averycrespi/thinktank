import History from "./History";
import React from "react";
import UserInterface from "./UserInterface";

interface BoardProps {
  G: any;
  ctx: any;
  moves: any;
}

const Board = ({ G, ctx, moves }: BoardProps) => {
  return (
    <div id="board">
      <UserInterface
        pieces={G.pieces}
        hand={G.hands.get(ctx.currentPlayer)!}
        player={ctx.currentPlayer}
        moves={moves}
      />
      <History history={G.history} />
    </div>
  );
};

export default Board;
