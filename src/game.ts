import {
  BLUE_HOME_CENTER,
  NUM_COLS,
  NUM_ROWS,
  RED_HOME_CENTER,
} from "./logic/grid";
import { Player, Token } from "./logic";

import { INVALID_MOVE } from "boardgame.io/core";
import { canPlace } from "./logic/place";

const placePiece = (G: any, ctx: any, token: Token, index: number) => {
  if (canPlace(G.pieces, ctx.currentPlayer, token, index)) {
    G.pieces[index] = { token, player: ctx.currentPlayer };
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: any, ctx: any, token: Token, index: number) =>
  INVALID_MOVE;

const movePiece = (G: any, ctx: any, srcIndex: number, destIndex: number) =>
  INVALID_MOVE;

const Game = {
  setup: () => {
    let pieces = Array(NUM_ROWS * NUM_COLS).fill(null);
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
  moves: { placePiece, rotatePiece, movePiece },
  turn: { moveLimit: 1 },
};

export default Game;
