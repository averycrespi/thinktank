import { Piece, Player } from "../../logic";

import React from "react";

interface GridPieceProps {
  readonly piece: Piece | null;
}

/** Render a piece (or lack thereof) on the grid. */
const GridPiece = ({ piece }: GridPieceProps) => {
  if (!piece) {
    return null;
  }
  const classes = [
    "piece",
    piece.player === Player.Red ? "red" : "",
    piece.player === Player.Blue ? "blue" : "",
  ];
  return <span className={classes.join(" ")}>{piece.token}</span>;
};

export default GridPiece;
