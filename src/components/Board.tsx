import Grid from "./Grid";
import React from "react";

interface BoardProps {
  G: any;
  moves: any;
}

const Board = ({ G, moves }: BoardProps) => {
  return <Grid cells={G.cells} handleClick={moves.clickCell} />;
};

export default Board;
