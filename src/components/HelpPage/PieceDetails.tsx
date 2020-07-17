import React from "react";

const PieceDetails = () => (
  <div className="row flex-center">
    <div
      className="col no-padding"
      style={{ textAlign: "center", wordWrap: "break-word" }}
    >
      <h2>Piece Details</h2>

      <div className="row flex-center flex-middle">
        <div className="col-4 no-padding padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Blocker</h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                Friendly tanks can shoot through a blocker, but enemy tanks
                cannot.
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">Moves 1 space in any direction.</p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">
                Can be captured, but cannot be shot or exploded.
              </p>
            </div>
          </div>
        </div>
        <div className="col-4 no-padding padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Tank</h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                All enemy tanks, infiltrators, and bases in a tank's line of
                fire* are destroyed.
              </p>
              <p className="card-text">
                All enemy mines in a tank's line of fire* are triggered.
              </p>
              <p className="card-text">
                <i>
                  *Note: A line of fire extends from the front of a tank to the
                  edge of the board.
                </i>
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">
                Moves 1 space horizontally or vertically. Can also be rotated.
              </p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">Can be captured, shot, or exploded.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row flex-center flex-middle">
        <div className="col-4 no-padding padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Infiltrators: (+) and (X)</h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                All enemy tanks and blockers adjacent to an infiltrator are
                captured*.
              </p>
              <p className="card-text">
                <i>
                  *Note: A piece can only be captured once per turn, even if
                  both red and blue infiltrators are adjacent. The enemy
                  infiltrator has priority.
                </i>
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">
                (+): Moves 1 space horizontally or vertically.
              </p>
              <p className="card-text">(X): Moves 1 space diagonally.</p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">
                Can be shot or exploded, but cannot be captured.
              </p>
            </div>
          </div>
        </div>
        <div className="col-4 no-padding padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mine</h4>
              <h5 className="card-subtitle">Description</h5>
              <p className="card-text">
                A mine is triggered when shot by an enemy tank or adjacent to an
                enemy piece.*
              </p>
              <p className="card-text">
                When a mine explodes, all adjacent tanks, infiltrators, mines,
                and bases are destroyed.** The mine is also destroyed by the
                explosion.
              </p>
              <p className="card-text">
                <i>*Exception: Enemy blockers do not trigger mines.</i>
              </p>
              <p className="card-text">
                <i>**Warning: Mines can destroy friendly pieces!</i>
              </p>
              <h5 className="card-subtitle">Movement</h5>
              <p className="card-text">
                Moves 2 spaces in any direction. Can jump over pieces.
              </p>
              <p className="card-text">
                <i>
                  Note: Mines are exempt from the No-Sacrifice Rule, since they
                  are allowed to explode themselves. However, you cannot use a
                  mine to sacrifice a friendly piece.
                </i>
              </p>
              <h5 className="card-subtitle">Vulnerabilities</h5>
              <p className="card-text">
                Can be shot or exploded, but cannot be captured.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row flex-center">
        <div className="col no-padding">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Base</h4>
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
                Can be shot or exploded, but cannot be captured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PieceDetails;
