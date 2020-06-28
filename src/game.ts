import {
  NUM_COLS,
  NUM_ROWS,
  blueBaseSpawn,
  coordsToIndex,
  indexToCoords,
  redBaseSpawn,
} from "./logic/grid";
import { canBluePlace, canRedPlace } from "./logic/rules";

import { INVALID_MOVE } from "boardgame.io/core";
import { Player } from "./logic/player";
import { Token } from "./logic/token";

const placePiece = (G: any, ctx: any, index: number, token: Token) => {
  if (G.cells[index] !== null) {
    return INVALID_MOVE;
  }
  const coords = indexToCoords(index);
  if (ctx.currentPlayer === Player.Red && !canRedPlace(coords, token)) {
    return INVALID_MOVE;
  }
  if (ctx.currentPlayer === Player.Blue && !canBluePlace(coords, token)) {
    return INVALID_MOVE;
  }
  G.cells[index] = { token, player: ctx.currentPlayer };
};

const rotatePiece = (G: any, ctx: any, index: number, token: Token) => {};

const movePiece = (G: any, ctx: any, src: number, dest: number) => {};

const Game = {
  setup: () => {
    let cells = Array(NUM_ROWS * NUM_COLS).fill(null);
    cells[coordsToIndex(redBaseSpawn())] = {
      token: Token.Base,
      player: Player.Red,
    };
    cells[coordsToIndex(blueBaseSpawn())] = {
      token: Token.Base,
      player: Player.Blue,
    };
    return { cells };
  },
  moves: { placePiece, rotatePiece, movePiece },
  turn: { moveLimit: 1 },
};

export default Game;
