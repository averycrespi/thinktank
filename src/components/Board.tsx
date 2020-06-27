import Grid from "./Grid";
import React from "react";

interface BoardProps {
  G: any;
}

const Board = ({ G }: BoardProps) => {
  return <Grid cells={G.cells} />;
};

export default Board;
