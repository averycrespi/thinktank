import React from "react";
import { Token } from "../../logic";
import TokenIcon from "../Board/TokenIcon";

/** Render information about the rules. */
const Rules = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>Rules</h2>

      <h3>Gameplay</h3>
      <p>
        The game has two players, <span className="red">Red</span> and{" "}
        <span className="blue">Blue</span>, who take alternating turns.
      </p>
      <p>
        Each player starts the game with a <b>hand</b> of 3 blockers, 5 tanks, 2
        infiltrators (+), 2 infiltrators (X), and 1 mine.
      </p>
      <p>
        On their turn, a player can perform <b>one</b> of the following actions:
      </p>
      <ul>
        <li>
          Place a piece from their hand onto the board. Pieces can only be
          placed in the player's <b>spawn area</b>.
        </li>
        <li>
          Move one of their pieces on the board. Pieces cannot enter either
          player's <b>home area</b>.
        </li>
        <li>
          Rotate one of their tanks on the board. Tanks can aim up, down, left,
          or right.
        </li>
      </ul>
      <p>
        When a piece is <b>captured</b> (by an infiltrator), it remains on the
        board but changes ownership.
      </p>
      <p>
        When a piece is <b>destroyed</b> (shot by a tank or exploded by a mine),
        it returns to the hand of its owner.
      </p>
      <p>The game ends when either player's base is destroyed.</p>

      <h3>No-Sacrifice Clause</h3>
      <p>
        When moving or placing a piece, you <b>cannot</b> allow any of your
        pieces to be destroyed* or captured.
      </p>
      <p>
        For example, you are forbidden from performing any of the following
        actions:
      </p>
      <ul>
        <li>
          Moving a vulnerable piece into the line of fire of an enemy tank{" "}
          <span className="red">
            <TokenIcon token={Token.RightTank} />
          </span>{" "}
          <span className="blue">
            <TokenIcon token={Token.LeftTank} />
          </span>
        </li>
        <li>
          Moving a vulnerable piece adjacent to an enemy infiltrator{" "}
          <span className="red">
            <TokenIcon token={Token.Blocker} />
          </span>{" "}
          <span className="blue">
            <TokenIcon token={Token.OrthogonalInfiltrator} />
          </span>
        </li>
        <li>
          Moving a vulnerable piece adjacent to an enemy mine{" "}
          <span className="red">
            <TokenIcon token={Token.DiagonalInfiltrator} />
          </span>{" "}
          <span className="blue">
            <TokenIcon token={Token.Mine} />
          </span>
        </li>
        <li>
          Moving a mine that will explode one of your own pieces*{" "}
          <span className="red">
            <TokenIcon token={Token.UpTank} />
          </span>{" "}
          <span className="red">
            <TokenIcon token={Token.Mine} />
          </span>{" "}
          <span className="blue">
            <TokenIcon token={Token.DownTank} />
          </span>
        </li>
        <li>
          Moving a blocker that is protecting one of your pieces{" "}
          <span className="red">
            <TokenIcon token={Token.DiagonalInfiltrator} />
          </span>{" "}
          <span className="red">
            <TokenIcon token={Token.Blocker} />
          </span>{" "}
          <span className="blue">
            <TokenIcon token={Token.LeftTank} />
          </span>
        </li>
      </ul>
      <i>
        *Exception: a mine may explode itself. See piece details for more
        information.
      </i>

      <h3>Piece Details</h3>
      <p>TODO</p>
    </div>
  </div>
);

export default Rules;
