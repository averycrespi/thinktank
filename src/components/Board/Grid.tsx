import {
  GRID_HEIGHT,
  GRID_WIDTH,
  coordsToIndex,
  isBlueHome,
  isRedHome,
} from "../../logic/grid";

import { Cell } from "../../logic";
import GridCell from "./GridCell";
import React from "react";

interface GridProps {
  readonly cells: Array<Cell>;
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

      let bgColor = "";
      const isRed = isRedHome(index);
      const isBlue = isBlueHome(index);
      const isHighlighted = highlighted.has(index);
      if (isRed && isHighlighted) {
        bgColor = "bg-light-red";
      } else if (isRed) {
        bgColor = "bg-lighter-red";
      } else if (isBlue && isHighlighted) {
        bgColor = "bg-light-blue";
      } else if (isBlue) {
        bgColor = "bg-lighter-blue";
      } else if (isHighlighted) {
        bgColor = "bg-light-gray";
      }

      tr.push(
        <td
          key={index}
          className={`cell ${bgColor}`}
          onClick={() => onCellClick(index)}
        >
          <GridCell cell={cells[index]} />
        </td>
      );
    }
    tbody.push(<tr key={y}>{tr}</tr>);
  }
  return (
    <table>
      <tbody>{tbody}</tbody>
    </table>
  );
};

export default Grid;
