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
  const destroyed = new Set<number>();
  // First pass: capture infiltrated cells.
  for (let index = 0; index < G.cells.length; index++) {
    const piece = G.cells[index];
    if (piece && canBeInfiltrated(G.cells, index)) {
      piece.player = opponentOf(piece.player);
    }
  }
  // Second pass: mark shot and exploded cells.
  for (let index = 0; index < G.cells.length; index++) {
    if (
      canBeShot(G.cells, index) ||
      canBeExploded(G.cells, index) ||
      canExplodeSelf(G.cells, index)
    ) {
      destroyed.add(index);
    }
  }
  // Third pass: remove destroyed cells.
  for (const index of destroyed) {
    const piece = G.cells[index];
    if (piece) {
      addToHand(G.hands[piece.player], piece.token);
      G.cells[index] = null;
    }
  }
};

export const game: Game<G, Ctx> = {
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
};
