import React from "react";
import TokenIcon from "./TokenIcon";
import { PlacedToken } from "../../logic/token";
import { colorClassOf } from "../../utils/colorClassOf";

interface GridCellProps {
  readonly cell: PlacedToken | null;
}

const GridCell = ({ cell }: GridCellProps) => {
  if (!cell) {
    return null;
  }
  return (
    <span className={colorClassOf(cell.owner)}>
      <TokenIcon token={cell.token} />
    </span>
  );
};

export default GridCell;
