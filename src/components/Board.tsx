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
  const [highlighted, setHighlighted] = useState(new Set<number>());
  const [activeToken, setActiveToken] = useState(Token.Blocker);
  const [activeIndex, setActiveIndex] = useState(0);

  const onTokenSelect = (token: Token) => {
    console.debug("Transition: Any -> Place");
    setAction(Action.Place);
    setHighlighted(validPlacements(pieces, player, token));
    setActiveToken(token);
  };

  const onCellClick = (index: number) => {
    switch (action) {
      case Action.None:
        if (pieces[index] && pieces[index].player === player) {
          console.debug("Transition: None -> Move");
          setAction(Action.Move);
          setHighlighted(validMovements(pieces, player, index));
          setActiveIndex(index);
        }
        break;
      case Action.Place:
        if (canPlace(pieces, player, activeToken, index)) {
          console.debug("Transition: Place -> None");
          setAction(Action.None);
          setHighlighted(new Set<number>());
          moves.placePiece(activeToken, index);
        } else if (pieces[index] && pieces[index].player === player) {
          console.debug("Transition: Place -> Move");
          setAction(Action.Move);
          setHighlighted(validMovements(pieces, player, index));
          setActiveIndex(index);
        }
        break;
      case Action.Move:
        if (canMove(pieces, player, activeIndex, index)) {
          console.debug("Transition: Move -> None");
          setAction(Action.None);
          setHighlighted(new Set<number>());
          moves.movePiece(activeIndex, index);
        } else if (pieces[index] && pieces[index].player === player) {
          console.debug("Transition: Move -> Move");
          setHighlighted(validMovements(pieces, player, index));
          setActiveIndex(index);
        }
        break;
    }
  };

  return (
    <div>
      <Grid
        pieces={G.pieces}
        highlighted={highlighted}
        onCellClick={onCellClick}
      />
      <Selector onTokenSelect={onTokenSelect} />
      <p>{"Action: " + Action[action]}</p>
    </div>
  );
};

export default Board;
