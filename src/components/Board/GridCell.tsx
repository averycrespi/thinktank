import { Cell, Player } from "../../logic";

import React from "react";
import TokenIcon from "./TokenIcon";

interface GridCellProps {
  readonly cell: Cell;
}

/** Render a cell in the grid. */
const GridCell = ({ cell }: GridCellProps) => {
  if (!cell) {
    return null;
  }
  let color = "";
  if (cell.player === Player.Red) {
    color = "red";
  } else if (cell.player === Player.Blue) {
    color = "blue";
  }
  return (
    <span className={color}>
      <TokenIcon token={cell.token} />
    </span>
  );
};

export default GridCell;
