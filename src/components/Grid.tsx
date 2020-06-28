import "../styles/grid.css";

import {
  NUM_COLS,
  NUM_ROWS,
  coordsToIndex,
  isBlueHome,
  isRedHome,
} from "../logic/grid";

import Cell from "./Cell";
import { Piece } from "../logic";
import React from "react";

interface GridProps {
  pieces: Array<Piece>;
  onCellClick(index: number): void;
}

const Grid = ({ pieces, onCellClick }: GridProps) => {
  let tbody = [];
  for (let y = 0; y < NUM_ROWS; y++) {
    let tr = [];
    for (let x = 0; x < NUM_COLS; x++) {
      const index = coordsToIndex({ x, y });
      const classes = [
        "cell",
        isRedHome(index) ? "home-red" : "",
        isBlueHome(index) ? "home-blue" : "",
      ];
      tr.push(
        <td
          key={index}
          className={classes.join(" ")}
          onClick={() => onCellClick(index)}
        >
          <Cell piece={pieces[index]} />
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
