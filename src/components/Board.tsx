import React, { useState } from "react";
import { canMove, validMovements } from "../logic/move";
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
  const [activeToken, setActiveToken] = useState(Token.Blocker);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCells, setActiveCells] = useState(new Set<number>());

  const onTokenSelect = (token: Token) => {
    console.debug("Transition: Any -> Place");
    setAction(Action.Place);
    setActiveToken(token);
    setActiveCells(validPlacements(pieces, player, token));
  };

  const onCellClick = (index: number) => {
    switch (action) {
      case Action.None:
        if (pieces[index] && pieces[index].player === player) {
          console.debug("Transition: None -> Move");
          setAction(Action.Move);
          setActiveIndex(index);
          setActiveCells(validMovements(pieces, player, index));
        }
        break;
      case Action.Place:
        if (canPlace(pieces, player, activeToken, index)) {
          console.debug("Transition: Place -> None");
          setAction(Action.None);
          setActiveCells(new Set<number>());
          moves.placePiece(activeToken, index);
        }
        break;
      case Action.Move:
        if (canMove(pieces, player, activeIndex, index)) {
          console.debug("Transition: Move -> None");
          setAction(Action.None);
          setActiveCells(new Set<number>());
          moves.movePiece(activeIndex, index);
        } else if (pieces[index] && pieces[index].player === player) {
          console.debug("Transition: Move -> Move");
          setActiveIndex(index);
          setActiveCells(validMovements(pieces, player, index));
        }
        break;
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
