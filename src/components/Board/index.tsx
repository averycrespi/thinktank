import { BoardProps } from "boardgame.io/react";
import GridController from "./GridController";
import React from "react";
import { Player } from "../../logic/player";
import { GameState } from "../../logic/state";
import { colorOf } from "../../utils/colorOf";
import { nameOf } from "../../utils/nameOf";

interface LocalBoardProps extends BoardProps {
  G: GameState;
}

const Board = ({ G, ctx, moves, isActive }: LocalBoardProps) => {
  const player = ctx.currentPlayer as Player;
  const winner = ctx.gameover as Player | null;

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          {winner ? (
            <h4>
              <span className={colorOf(winner)}>{nameOf(winner)}</span> wins!
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
            state={G}
            player={player}
            placeToken={moves.place}
            moveToken={moves.move}
            rotateToken={moves.rotate}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
