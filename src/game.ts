import {
  BLUE_HOME_CENTER,
  GRID_HEIGHT,
  GRID_WIDTH,
  RED_HOME_CENTER,
} from "./logic/grid";
import { Player, Token } from "./logic";

import { INVALID_MOVE } from "boardgame.io/core";
import { canMove } from "./logic/move";
import { canPlace } from "./logic/place";

const placePiece = (G: any, ctx: any, token: Token, index: number) => {
  if (canPlace(G.pieces, { player: ctx.currentPlayer, token }, index)) {
    G.pieces[index] = { token, player: ctx.currentPlayer };
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: any, ctx: any, srcIndex: number, destIndex: number) => {
  if (canMove(G.pieces, ctx.currentPlayer, srcIndex, destIndex)) {
    G.pieces[destIndex] = G.pieces[srcIndex];
    G.pieces[srcIndex] = null;
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: any, ctx: any, token: Token, index: number) =>
  INVALID_MOVE;

const Game = {
  setup: () => {
    let pieces = Array(GRID_WIDTH * GRID_HEIGHT).fill(null);
    pieces[RED_HOME_CENTER] = {
      token: Token.Base,
      player: Player.Red,
    };
    pieces[BLUE_HOME_CENTER] = {
      token: Token.Base,
      player: Player.Blue,
    };
    return { pieces };
  },
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1 },
};

export default Game;
