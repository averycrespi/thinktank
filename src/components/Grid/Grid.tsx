import React from "react";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  isInHome,
  toPosition,
} from "../../logic/grid";
import { PlacedToken } from "../../logic/token";
import { classOf } from "../../utils/classOf";
import TokenIcon from "../TokenIcon/TokenIcon";
import "./Grid.css";

const Y_INDICES = [...Array(GRID_HEIGHT).keys()];
const X_INDICES = [...Array(GRID_WIDTH).keys()];

const cellClasses = (
  index: number,
  highlightedIndices?: Set<number>
): Array<String> =>
  [
    "grid-cell",
    isInHome(index) ? "home" : "",
    highlightedIndices && highlightedIndices.has(index) ? "highlighted" : "",
  ].filter((c) => c.length > 0);

interface GridProps {
  grid: Array<PlacedToken | null>;
  highlightedIndices?: Set<number>;
  handleCellClick(index: number): void;
  showPositions: boolean;
}

/** Renders a grid of cells. */
const Grid = ({
  grid,
  highlightedIndices,
  handleCellClick,
  showPositions,
}: GridProps) => (
  <table className="grid">
    <tbody>
      {Y_INDICES.map((y) => (
        <tr className="grid-row" key={y}>
          {X_INDICES.map((x) => {
            const i = y * GRID_WIDTH + x;
            const cell = grid[i];
            return (
              <td
                className={cellClasses(i, highlightedIndices).join(" ")}
                key={i}
                onClick={() => handleCellClick(i)}
              >
                {cell ? (
                  <div className={["token", classOf(cell.owner)].join(" ")}>
                    <TokenIcon token={cell.token} />
                  </div>
                ) : (
                  <div className="token position">
                    {showPositions && toPosition(i)}
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Grid;
