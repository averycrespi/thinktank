import React from "react";

/** Render the controls. */
const Controls = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>Controls</h2>
      <p>
        <b>Place a piece:</b> Click a piece in your hand, then click one of the
        highlighted spaces.
      </p>
      <p>
        <b>Move a piece:</b> Click a piece on the board, then click one of the
        highlighted spaces.
      </p>
      <p>
        <b>Rotate a piece:</b> Click a tank in your hand, then click one of the
        highlighted tanks on the board.
      </p>
    </div>
  </div>
);

export default Controls;
