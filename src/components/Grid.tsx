import { NUM_COLS, NUM_ROWS, isHome, toIndex } from "../logic/grid";

import { Piece } from "../logic/piece";
import React from "react";

const cellStyle = {
  border: "1px solid #555",
  width: "25px",
  height: "25px",
  lineHeight: "25px",
};

const homeStyle = {
  ...cellStyle,
  background: "#555",
};

interface GridProps {
  cells: Array<Piece>;
  colors: any;
  onClick(index: number): void;
}

const Grid = ({ cells, colors, onClick }: GridProps) => {
  let tbody = [];
  for (let y = 0; y < NUM_ROWS; y++) {
    let tr = [];
    for (let x = 0; x < NUM_COLS; x++) {
      const index = toIndex(x, y);
      const style = isHome(x, y) ? homeStyle : cellStyle;
      const piece = cells[index];
      tr.push(
        <td key={index} style={style} onClick={() => onClick(index)}>
          {piece ? (
            <span style={{ color: colors[piece.playerId] }}>{piece.token}</span>
          ) : (
            ""
          )}
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
