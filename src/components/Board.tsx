import React, { useState } from "react";

import Grid from "./Grid";
import Selector from "./Selector";
import { Token } from "../logic/token";

interface BoardProps {
  G: any;
  moves: any;
}

const Board = ({ G, moves }: BoardProps) => {
  const [activeToken, setActiveToken] = useState(Token.Blocker);
  const onSelect = (token: Token) => setActiveToken(token);
  const onCellClick = (index: number) => moves.placePiece(index, activeToken);
  return (
    <div>
      <Selector onSelect={onSelect} />
      <Grid cells={G.cells} onCellClick={onCellClick} />
    </div>
  );
};

export default Board;
