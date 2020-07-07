import { Cell } from "../../logic";
import React from "react";
import TokenIcon from "./TokenIcon";
import { colorOf } from "../../utils/colorOf";

interface GridCellProps {
  readonly cell: Cell;
}

/** Render a cell in the grid. */
const GridCell = ({ cell }: GridCellProps) => {
  if (!cell) {
    return null;
  }
  return (
    <span className={colorOf(cell.player)}>
      <TokenIcon token={cell.token} />
    </span>
  );
};

export default GridCell;
