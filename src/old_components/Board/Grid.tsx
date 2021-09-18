import { GRID_HEIGHT, GRID_WIDTH, isInHomeOf } from "../../logic/grid";

import GridCell from "./GridCell";
import React from "react";
import { PlacedToken } from "../../logic/token";
import { Player } from "../../logic/player";

interface GridProps {
  readonly grid: Array<PlacedToken | null>;
  readonly highlighted: Set<number>;
  readonly scale: number;
  onCellClick(index: number): void;
}

const Grid = ({ grid, highlighted, scale, onCellClick }: GridProps) => {
  let cells = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = y * GRID_WIDTH + x;

      let background = "";
      const isRed = isInHomeOf(Player.One, index);
      const isBlue = isInHomeOf(Player.Two, index);
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

      cells.push(
        <div
          key={index}
          onClick={() => onCellClick(index)}
          className={background}
          style={{
            border: "1px solid #777",
            textAlign: "center",
            width: `${scale}em`,
            height: `${scale}em`,
            lineHeight: `${scale}em`,
            gridColumnStart: x + 1,
            gridColumnEnd: "span 1",
            gridRowStart: y + 1,
            gridRowEnd: "span 1",
          }}
        >
          <GridCell cell={grid[index]} />
        </div>
      );
    }
  }
  return (
    <div
      className="shadow"
      style={{
        display: "grid",
        width: `${GRID_WIDTH * scale}em`,
        border: "2px solid #000",
      }}
    >
      {cells}
    </div>
  );
};

export default Grid;
