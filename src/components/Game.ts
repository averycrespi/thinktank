import { NUM_COLS, NUM_ROWS, canPlace, fromIndex } from "../logic/grid";

import { INVALID_MOVE } from "boardgame.io/core";
import { Token } from "../logic/piece";

const Game = {
  setup: () => ({ cells: Array(NUM_ROWS * NUM_COLS).fill(null) }),
  moves: {
    placePiece: (G: any, ctx: any, index: number, token: Token) => {
      if (G.cells[index] !== null) {
        return INVALID_MOVE;
      }
      if (!canPlace(...fromIndex(index))) {
        return INVALID_MOVE;
      }
      G.cells[index] = { token, playerId: ctx.currentPlayer };
    },
    rotatePiece: (G: any, ctx: any, index: number, token: Token) => {},
    movePiece: (G: any, ctx: any, srcIndex: number, destIndex: number) => {},
  },
  turn: {
    moveLimit: 1,
  },
};

export default Game;
