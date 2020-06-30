import { BLUE_HOME_CENTER, RED_HOME_CENTER } from "./logic/grid";
import { Piece, Player, Token } from "./logic";

import { INVALID_MOVE } from "boardgame.io/core";
import { canMove } from "./logic/move";
import { canPlace } from "./logic/place";

const placePiece = (G: any, ctx: any, token: Token, index: number) => {
  if (canPlace(G.pieces, { player: ctx.currentPlayer, token }, index)) {
    G.pieces.set(index, { token, player: ctx.currentPlayer });
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: any, ctx: any, srcIndex: number, destIndex: number) => {
  if (canMove(G.pieces, ctx.currentPlayer, srcIndex, destIndex)) {
    G.pieces.set(destIndex, G.pieces.get(srcIndex));
    G.pieces.set(srcIndex, null);
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: any, ctx: any, token: Token, index: number) =>
  INVALID_MOVE;

const Game = {
  setup: () => {
    let pieces = new Map<number, Piece>();
    pieces.set(RED_HOME_CENTER, { token: Token.Base, player: Player.Red });
    pieces.set(BLUE_HOME_CENTER, { token: Token.Base, player: Player.Blue });
    return { pieces };
  },
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1 },
};

export default Game;
