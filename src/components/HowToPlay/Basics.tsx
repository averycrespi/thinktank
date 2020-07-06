import React from "react";

/** Render information about the basics. */
const Basics = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>The Basics</h2>
      <p>Thinktank is a 2-player strategy game inspired by Conundrum.</p>
      <p>On your turn, you can do one of the following:</p>
      <ul>
        <li>
          <b>Place</b> a piece from your hand
        </li>
        <li>
          <b>Move</b> one of your pieces
        </li>
        <li>
          <b>Rotate</b> one of your tanks
        </li>
      </ul>
      <p>You win the game by destroying your opponent's base.</p>
      <p>
        But there's a catch: <i>you can't sacrifice your own pieces!</i>
      </p>
    </div>
  </div>
);

export default Basics;
