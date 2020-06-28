import Grid from "./Grid";
import React from "react";
import { Token } from "../logic/piece";

interface BoardProps {
  G: any;
  moves: any;
}

const Board = ({ G, moves }: BoardProps) => {
  const onClick = (index: number) => moves.placePiece(index, Token.Blocker);
  return (
    <Grid
      cells={G.cells}
      colors={{ "0": "red", "1": "blue" }}
      onClick={onClick}
    />
  );
};

export default Board;
