import { BoardProps } from "boardgame.io/react";
import React from "react";
import { opponentOf, Player } from "../../logic/player";
import { GameState } from "../../logic/state";
import MatchController from "../MatchController/MatchController";

interface LocalBoardProps extends BoardProps {
  G: GameState;
}

/** Forwards data from boardgame.io to a match controller. */
const Board = ({ G, ctx, moves, isActive }: LocalBoardProps) => {
  const currentPlayer = ctx.currentPlayer as Player;
  const player = isActive ? currentPlayer : opponentOf(currentPlayer);
  const winner = ctx.gameover ? (ctx.gameover as Player) : null;

  return (
    <MatchController
      state={G}
      player={player}
      isActive={isActive}
      winner={winner}
      place={moves.place}
      move={moves.move}
      rotate={moves.rotate}
    />
  );
};

export default Board;
