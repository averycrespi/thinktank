import { Piece } from "../logic/piece";
import { Player } from "../logic/player";
import React from "react";

interface CellProps {
  piece: Piece;
}

const Cell = ({ piece }: CellProps) => {
  if (!piece) {
    return null;
  }
  const classes = [
    piece.player === Player.Red ? "red-piece" : "",
    piece.player === Player.Blue ? "blue-piece" : "",
  ];
  return <span className={classes.join(" ")}>{piece.token}</span>;
};

export default Cell;
