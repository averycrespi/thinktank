import { GRID_HEIGHT, GRID_WIDTH } from "../../logic/grid";
import React, { useEffect } from "react";

interface GameHistoryProps {
  history: Array<string>;
  scale: number;
}

/** Render the history of a game. */
const GameHistory = ({ history, scale }: GameHistoryProps) => {
  useEffect(() => {
    const div = document.getElementById("history");
    if (div) {
      // Scroll to the bottom when the history is updated.
      div.scrollTop = div.scrollHeight;
    }
  });
  return (
    <div
      id="history"
      className="shadow"
      style={{
        border: "2px solid #000",
        height: `${GRID_HEIGHT * scale}em`,
        width: `${Math.floor((GRID_WIDTH * scale) / 2)}em`,
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <table>
        <thead>
          <th>History</th>
        </thead>
        <tbody>
          {history.length === 0 && (
            <tr>
              <td>
                <i>Events will appear here.</i>
              </td>
            </tr>
          )}
          {history.map((e) => (
            <tr>
              <td>{e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameHistory;
