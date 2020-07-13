import React from "react";

const Basics = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>The Basics</h2>
      <p>Thinktank is a 2-player strategy game inspired by Conundrum.</p>
      <p>
        On your turn, you can <b>place</b> a piece, <b>move</b> a piece, or{" "}
        <b>rotate</b> a tank.
      </p>
      <p>You win the game by destroying your opponent's base.</p>
      <p>
        But there's a catch: <i>you can't sacrifice your own pieces!</i>
      </p>
    </div>
  </div>
);

export default Basics;
