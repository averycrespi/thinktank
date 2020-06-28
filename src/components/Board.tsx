import React, { useState } from "react";

import Grid from "./Grid";
import Selector from "./Selector";
import { Token } from "../logic";

interface BoardProps {
  G: any;
  ctx: any;
  moves: any;
}

const Board = ({ G, moves }: BoardProps) => {
  const [activeToken, setActiveToken] = useState(Token.Blocker);

  const onSelect = (token: Token) => setActiveToken(token);
  const onCellClick = (index: number) => moves.placePiece(activeToken, index);

  return (
    <div>
      <Selector onSelect={onSelect} />
      <Grid pieces={G.pieces} onCellClick={onCellClick} />
    </div>
  );
};

export default Board;
