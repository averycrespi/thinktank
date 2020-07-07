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

const CELL_SCALE = 2;

interface GridProps {
  readonly cells: Array<Cell>;
  readonly highlighted: Set<number>;
  onCellClick(index: number): void;
}

/** Render a 2D array of cells. */
const Grid = ({ cells, highlighted, onCellClick }: GridProps) => {
  let grid = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = coordsToIndex({ x, y });

      let background = "";
      const isRed = isRedHome(index);
      const isBlue = isBlueHome(index);
      const isHighlighted = highlighted.has(index);
      if (isRed && isHighlighted) {
        background = "bg-light-red";
      } else if (isRed) {
        background = "bg-lighter-red";
      } else if (isBlue && isHighlighted) {
        background = "bg-light-blue";
      } else if (isBlue) {
        background = "bg-lighter-blue";
      } else if (isHighlighted) {
        background = "bg-light-gray";
      }

      grid.push(
        <div
          key={index}
          onClick={() => onCellClick(index)}
          className={background}
          style={{
            border: "1px solid #777",
            textAlign: "center",
            width: `${CELL_SCALE}em`,
            height: `${CELL_SCALE}em`,
            lineHeight: `${CELL_SCALE}em`,
            gridColumnStart: x + 1,
            gridColumnEnd: "span 1",
            gridRowStart: y + 1,
            gridRowEnd: "span 1",
          }}
        >
          <GridCell cell={cells[index]} />
        </div>
      );
    }
  }
  return (
    <div
      className="shadow"
      style={{
        display: "grid",
        width: `${GRID_WIDTH * CELL_SCALE}em`,
        border: "2px solid #000",
      }}
    >
      {grid}
    </div>
  );
};

export default Grid;
