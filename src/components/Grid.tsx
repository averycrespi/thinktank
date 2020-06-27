import { NUM_COLS, NUM_ROWS } from "../common";

import React from "react";

const cellStyle = {
  border: "1px solid #555",
  width: "25px",
  height: "25px",
  lineHeight: "25px",
};

interface GridProps {
  cells: Array<any>;
}

const Grid = ({ cells }: GridProps) => {
  let tbody = [];
  for (let y = 0; y < NUM_ROWS; y++) {
    let tr = [];
    for (let x = 0; x < NUM_COLS; x++) {
      const index = y * NUM_ROWS + x;
      tr.push(
        <td key={index} style={cellStyle}>
          {cells[index]}
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
