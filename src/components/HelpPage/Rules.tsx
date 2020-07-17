import React from "react";
import { Token } from "../../logic";
import TokenIcon from "../Board/TokenIcon";

const Rules = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>The Rules</h2>

      <h3>Gameplay</h3>

      <div>
        <p>
          The game has two players, <span className="red">Red</span> and{" "}
          <span className="blue">Blue</span>, who take alternating turns. Each
          player starts with a <b>hand</b> of pieces.
        </p>
        <p>
          On their turn, a player may place a piece from their hand, move a
          piece on the board, or rotate a tank on the board.
        </p>
        <p>
          Pieces can only be placed in a player's spawn area, and cannot enter
          either player's home area.
        </p>
        <p>
          When a piece is <b>destroyed</b> (shot by an enemy tank or exploded by
          a mine), it returns to the hand of its owner.
        </p>
        <p>
          When a piece is <b>captured</b> by an enemy infiltrator, it remains on
          the board but changes ownership.
        </p>
        <p>
          When moving or placing a piece, you cannot allow any of your pieces
          (except mines) to be destroyed or captured.
        </p>
        <p>The game ends when either player's base is destroyed.</p>
      </div>

      <h3>Pieces</h3>

      <div className="row flex-center">
        <div className="col-12 no-padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <TokenIcon token={Token.Blocker} /> Blocker
              </h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">Blocks shots from enemy tanks.</p>
              <p className="card-text">
                Friendly tanks can shoot through a friendly blocker.
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">Moves 1 space in any direction.</p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">
                Can be captured. Cannot be shot or exploded.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row flex-center">
        <div className="col-12 no-padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <TokenIcon token={Token.UpTank} /> Tank
              </h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                Destroys enemy tanks, infiltrators, and bases. Triggers enemy
                mines.
              </p>
              <p className="card-text">
                A tank's line of fire extends from its front to the edge of the
                board.
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">
                Moves 1 space horizontally or vertically. Can be rotated.
              </p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">Can be captured, shot, or exploded.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row flex-center">
        <div className="col-12 no-padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <TokenIcon token={Token.OrthogonalInfiltrator} /> Infiltrators
              </h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                Captures adjacant enemy tanks and blockers.
              </p>
              <p className="card-text">
                A piece can only be captured once per turn, even if both red and
                blue infiltrators are adjacent.
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">
                <TokenIcon token={Token.OrthogonalInfiltrator} /> Moves 1 space
                horizontally or vertically.
              </p>
              <p className="card-text">
                <TokenIcon token={Token.DiagonalInfiltrator} /> Moves 1 space
                diagonally.
              </p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">
                Can be shot or exploded. Cannot be captured.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row flex-center">
        <div className="col-12 no-padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <TokenIcon token={Token.Mine} /> Mine
              </h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                Destroys adjacent tanks, infiltrators, mines, and bases when it
                explodes.
              </p>
              <p className="card-text">
                A mine explodes when shot by an enemy tank or adjacent to an
                enemy piece (except a blocker).
              </p>
              <p className="card-text">
                An exploding mine destroys friendly pieces, enemy pieces, and
                the mine itself.
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">
                Moves 2 spaces in any direction. Can jump over pieces.
              </p>
              <p className="card-text">
                Cannot be placed in or moved to a space if its explosion would
                destroy friendly pieces.
              </p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">
                Can be shot or exploded. Cannot be captured.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row flex-center">
        <div className="col-12 no-padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <TokenIcon token={Token.Base} /> Base
              </h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                The game ends when either player's base is destroyed.
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">
                Moves 1 space in any direction. Cannot move outside of its home
                area.
              </p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">
                Can be shot or exploded. Cannot be captured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Rules;
