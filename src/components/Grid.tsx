import "../styles/grid.css";

import {
  GRID_HEIGHT,
  GRID_WIDTH,
  coordsToIndex,
  isBlueHome,
  isRedHome,
} from "../logic/grid";

import Cell from "./Cell";
import { Piece } from "../logic";
import React from "react";

interface GridProps {
  pieces: Map<number, Piece>;
  highlighted?: Set<number>;
  onCellClick(index: number): void;
}

const Grid = ({ pieces, highlighted = new Set(), onCellClick }: GridProps) => {
  let tbody = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    let tr = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = coordsToIndex({ x, y });
      const classes = [
        "cell",
        isRedHome(index) ? "home-red" : "",
        isBlueHome(index) ? "home-blue" : "",
        highlighted.has(index) ? "highlighted" : "",
      ];
      tr.push(
        <td
          key={index}
          className={classes.join(" ")}
          onClick={() => onCellClick(index)}
        >
          <Cell piece={pieces.get(index)} />
        </td>
      );
    }
    tbody.push(<tr key={y}>{tr}</tr>);
  }
  return (
    <table id="grid">
      <tbody>{tbody}</tbody>
    </table>
  );
};

export default Grid;
