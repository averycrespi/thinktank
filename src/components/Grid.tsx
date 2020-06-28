import "../styles/grid.css";

import {
  NUM_COLS,
  NUM_ROWS,
  coordsToIndex,
  isBlueHome,
  isRedHome,
} from "../logic/grid";

import Cell from "./Cell";
import { Piece } from "../logic/piece";
import React from "react";

interface GridProps {
  cells: Array<Piece>;
  onCellClick(index: number): void;
}

const Grid = ({ cells, onCellClick }: GridProps) => {
  let tbody = [];
  for (let y = 0; y < NUM_ROWS; y++) {
    let tr = [];
    for (let x = 0; x < NUM_COLS; x++) {
      const index = coordsToIndex({ x, y });
      const classes = [
        "cell",
        isRedHome({ x, y }) ? "red-home" : "",
        isBlueHome({ x, y }) ? "blue-home" : "",
      ];
      tr.push(
        <td
          key={index}
          className={classes.join(" ")}
          onClick={() => onCellClick(index)}
        >
          <Cell piece={cells[index]} />
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
