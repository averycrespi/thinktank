import { G, Player, Result, nameOf } from "../../logic";

import { BoardProps } from "boardgame.io";
import GridController from "./GridController";
import React from "react";
import { colorOf } from "../../utils/colorOf";

interface LocalBoardProps extends BoardProps {
  G: G;
}

const Board = ({ G, ctx, moves, isActive }: LocalBoardProps) => {
  const player = ctx.currentPlayer as Player;
  const gameover = ctx.gameover as Result;

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          {gameover ? (
            <h4>
              <span className={colorOf(gameover.winner)}>
                {nameOf(gameover.winner)}
              </span>{" "}
              wins!
            </h4>
          ) : (
            <h4>
              <span className={colorOf(player)}>{nameOf(player)}</span>'s turn
            </h4>
          )}
        </div>
      </div>
      <div className="row flex-center">
        <div className="col no-padding">
          <GridController
            isActive={isActive}
            cells={G.cells}
            hand={G.hands[player]}
            events={G.events}
            player={player}
            placePiece={moves.placePiece}
            movePiece={moves.movePiece}
            rotatePiece={moves.rotatePiece}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
