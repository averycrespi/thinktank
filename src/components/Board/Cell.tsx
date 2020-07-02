import { Piece, Player } from "../../logic";

import React from "react";

interface CellProps {
  readonly piece?: Piece;
}

const Cell = ({ piece }: CellProps) => {
  if (!piece) {
    return null;
  }
  const classes = [
    piece.player === Player.Red ? "piece-red" : "",
    piece.player === Player.Blue ? "piece-blue" : "",
  ];
  return <span className={classes.join(" ")}>{piece.token}</span>;
};

export default Cell;
