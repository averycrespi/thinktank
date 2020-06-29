import React, { useState } from "react";
import { canPlace, validPlacements } from "../logic/place";

import Grid from "./Grid";
import Selector from "./Selector";
import { Token } from "../logic";

enum Action {
  None,
  Place,
  Move,
  Rotate,
}

interface BoardProps {
  G: any;
  ctx: any;
  moves: any;
}

const Board = ({ G, ctx, moves }: BoardProps) => {
  const { pieces } = G;
  const { currentPlayer: player } = ctx;

  const [action, setAction] = useState(Action.None);
  const [token, setToken] = useState(Token.Blocker);
  const [activeCells, setActiveCells] = useState(new Set<number>());

  const onTokenSelect = (token: Token) => {
    setAction(Action.Place);
    setToken(token);
    setActiveCells(validPlacements(pieces, player, token));
  };

  const onCellClick = (index: number) => {
    if (action === Action.Place && canPlace(pieces, player, token, index)) {
      setAction(Action.None);
      setActiveCells(new Set<number>());
      moves.placePiece(token, index);
    }
  };

  return (
    <div>
      <Grid
        pieces={G.pieces}
        activeCells={activeCells}
        onCellClick={onCellClick}
      />
      <Selector onTokenSelect={onTokenSelect} />
    </div>
  );
};

export default Board;
