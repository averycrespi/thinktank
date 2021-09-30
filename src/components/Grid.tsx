import React from "react";
import { GRID_HEIGHT, GRID_WIDTH, isInHome } from "../logic/grid";
import { Player } from "../logic/player";
import { PlacedToken } from "../logic/token";
import TokenIcon from "./TokenIcon";

const Y_INDICES = [...Array(GRID_HEIGHT).keys()];
const X_INDICES = [...Array(GRID_WIDTH).keys()];
const EMPTY_CELL = "";

const cellClasses = (
  index: number,
  highlightedIndices?: Set<number>
): Array<String> =>
  [
    "grid-cell",
    isInHome(index) ? "home" : "",
    highlightedIndices && highlightedIndices.has(index) ? "highlighted" : "",
  ].filter((c) => c.length > 0);

const tokenClasses = (cell: PlacedToken | null): Array<String> =>
  [
    "token",
    cell && cell.owner === Player.One ? "player-one" : "",
    cell && cell.owner === Player.Two ? "player-two" : "",
  ].filter((c) => c.length > 0);

interface GridProps {
  grid: Array<PlacedToken | null>;
  highlightedIndices?: Set<number>;
  handleCellClick(index: number): void;
}

/** Renders a grid of grid. */
const Grid = ({ grid, highlightedIndices, handleCellClick }: GridProps) => (
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
                <div className={tokenClasses(cell).join(" ")}>
                  {cell ? <TokenIcon token={cell.token} /> : EMPTY_CELL}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Grid;
