import { GRID_HEIGHT, GRID_WIDTH } from "../../logic/grid";
import React, { useEffect } from "react";

interface EventsProps {
  events: Array<string>;
  scale: number;
}

const Events = ({ events, scale }: EventsProps) => {
  useEffect(() => {
    const div = document.getElementById("history");
    if (div) {
      // Scroll to the bottom on update.
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
        <tbody>
          {events.length === 0 && (
            <tr>
              <td>
                <i>Events will appear here.</i>
              </td>
            </tr>
          )}
          {events.map((e) => (
            <tr>
              <td>{e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
