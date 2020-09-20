import { Event, EventKind, nameOf } from "../../logic";
import { GRID_HEIGHT, GRID_WIDTH } from "../../logic/grid";
import React, { useEffect } from "react";

import TokenIcon from "./TokenIcon";
import { colorOf } from "../../utils/colorOf";

interface EventsProps {
  events: Array<Event>;
  scale: number;
}

const Events = ({ events, scale }: EventsProps) => {
  useEffect(() => {
    const div = document.getElementById("events");
    if (div) {
      // Scroll to the bottom on update.
      div.scrollTop = div.scrollHeight;
    }
  });
  return (
    <div
      id="events"
      className="shadow"
      style={{
        border: "2px solid #000",
        height: `${GRID_HEIGHT * scale}em`,
        width: `${Math.floor((GRID_WIDTH * scale) / 2.5)}em`,
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
          {events.map((e) => {
            var verb = "";
            switch (e.kind) {
              case EventKind.MovePiece:
                verb = "moved";
                break;
              case EventKind.RotatePiece:
                verb = "rotated";
                break;
              case EventKind.PlacePiece:
                verb = "placed";
                break;
              case EventKind.ShootPiece:
                verb = "shot";
                break;
              case EventKind.CapturePiece:
                verb = "captured";
                break;
              case EventKind.ExplodePiece:
                verb = "exploded";
                break;
            }
            return (
              <tr>
                <td>
                  {
                    <span>
                      <span className={colorOf(e.player)}>
                        {nameOf(e.player)}
                      </span>
                      {" " + verb + " "}
                      <span className={colorOf(e.piece.player)}>
                        <TokenIcon token={e.piece.token} />
                      </span>
                    </span>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
