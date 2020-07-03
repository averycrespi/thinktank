import {
  GRID_HEIGHT,
  GRID_WIDTH,
  coordsToIndex,
  isBlueHome,
  isRedHome,
} from "../../logic/grid";

import { Cells } from "../../logic";
import GridPiece from "./GridPiece";
import React from "react";

interface GridProps {
  readonly cells: Cells;
  readonly highlighted: Set<number>;
  onCellClick(index: number): void;
}

/** Render a 2D array of cells. */
const Grid = ({ cells, highlighted, onCellClick }: GridProps) => {
  let tbody = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    let tr = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = coordsToIndex({ x, y });
      const classes = [
        "cell",
        isRedHome(index) ? "red" : "",
        isBlueHome(index) ? "blue" : "",
        highlighted.has(index) ? "highlighted" : "",
      ];
      tr.push(
        <td
          key={index}
          className={classes.join(" ")}
          onClick={() => onCellClick(index)}
        >
          <GridPiece piece={cells[index]} />
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
