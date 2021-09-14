import React from "react";
import TokenIcon from "./TokenIcon";
import { colorOf } from "../../utils/colorOf";
import { PlacedToken } from "../../logic/token";

interface GridCellProps {
  readonly cell: PlacedToken | null;
}

const GridCell = ({ cell }: GridCellProps) => {
  if (!cell) {
    return null;
  }
  return (
    <span className={colorOf(cell.owner)}>
      <TokenIcon token={cell.token} />
    </span>
  );
};

export default GridCell;
