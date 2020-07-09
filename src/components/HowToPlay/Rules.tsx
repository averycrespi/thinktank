import React from "react";

/** Render the rules. */
const Rules = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>Rules</h2>
      <p>
        The game has two players, <span className="red">Red</span> and{" "}
        <span className="blue">Blue</span>, who take alternating turns.
      </p>
      <p>
        Each player starts the game with a <b>hand</b> of 3 blockers, 5 tanks, 2
        infiltrators (+), 2 infiltrators (X), and 1 mine.
      </p>
      <p>
        On their turn, a player may <b>place</b> a piece from their hand,{" "}
        <b>move</b> a piece on the board, or <b>rotate</b> a tank on the board.
      </p>
      <p>
        Pieces must be placed in a player's <b>spawn area</b>, and cannot enter
        either player's <b>home area</b>.*
      </p>
      <p>
        When a piece is <b>destroyed</b> (shot by a tank or exploded by a mine),
        it returns to the hand of its owner.
      </p>
      <p>
        When a piece is <b>captured</b> (by an infiltrator), it remains on the
        board but changes ownership.
      </p>
      <p>
        <b>No-Sacrifice Rule</b>: When moving or placing a piece, you{" "}
        <b>cannot</b> allow any of your pieces to be destroyed** or captured.
      </p>
      <p>The game ends when either player's base is destroyed.</p>
      <p>
        <i>
          *Exception: A player's base can <b>only</b> move inside its home area.
        </i>
      </p>
      <p>
        <i>
          **Exception: A mine may explode itself. See piece details for more
          information.
        </i>
      </p>
    </div>
  </div>
);

export default Rules;
