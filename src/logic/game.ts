import { BLUE_HOME_CENTER, GRID_SIZE, RED_HOME_CENTER } from "./grid";
import { Ctx, Game } from "boardgame.io";
import {
  G,
  Piece,
  Player,
  Token,
  addToHand,
  createHand,
  opponentOf,
  removeFromHand,
} from ".";
import {
  canBeExploded,
  canBeInfiltrated,
  canBeShot,
  canExplodeSelf,
} from "./danger";

import { INVALID_MOVE } from "boardgame.io/core";
import { canMove } from "./move";
import { canPlace } from "./place";

const setup = (): G => {
  let cells = new Array<Piece>(GRID_SIZE);
  cells[RED_HOME_CENTER] = { token: Token.Base, player: Player.Red };
  cells[BLUE_HOME_CENTER] = { token: Token.Base, player: Player.Blue };
  return {
    cells,
    hands: {
      [Player.Red]: createHand(),
      [Player.Blue]: createHand(),
    },
  };
};

const placePiece = (G: G, ctx: Ctx, token: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  if (canPlace(G.cells, G.hands[player], { token, player }, index)) {
    G.cells[index] = { token, player };
    removeFromHand(G.hands[player], token);
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: G, ctx: Ctx, srcIndex: number, destIndex: number) => {
  const player = ctx.currentPlayer as Player;
  if (canMove(G.cells, player, srcIndex, destIndex)) {
    G.cells[destIndex] = G.cells[srcIndex];
    G.cells[srcIndex] = null;
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: G, ctx: Ctx, token: Token, index: number) =>
  INVALID_MOVE; // TODO: implement rotatePiece

const onTurnEnd = (G: G, ctx: Ctx) => {
  // First pass: capture infiltrated cells and mark exploding mines.
  const exploding = new Map<number, Piece>();
  for (let index = 0; index < G.cells.length; index++) {
    const piece = G.cells[index];
    if (!piece) {
      continue;
    } else if (canBeInfiltrated(G.cells, index)) {
      piece.player = opponentOf(piece.player);
    } else if (canExplodeSelf(G.cells, index)) {
      exploding.set(index, piece);
    }
  }
  // Second pass: remove shot and exploded cells.
  for (let index = 0; index < G.cells.length; index++) {
    const piece = G.cells[index];
    if (!piece) {
      continue;
    } else if (canBeShot(G.cells, index) || canBeExploded(G.cells, index)) {
      G.cells[index] = null;
      if (!exploding.has(index)) {
        // Don't double-count mines that are exploding AND exploded.
        addToHand(G.hands[piece.player], piece.token);
      }
    }
  }
  // Third pass: remove exploding mines.
  for (const [index, piece] of exploding.entries()) {
    G.cells[index] = null;
    addToHand(G.hands[piece.player], piece.token);
  }
};

export const game: Game<G, Ctx> = {
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
};
