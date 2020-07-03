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
  canExplodeEnemy,
} from "./danger";

import { INVALID_MOVE } from "boardgame.io/core";
import { canMove } from "./move";
import { canPlace } from "./place";

/** Setup the game state. */
const setup = (): G => {
  let cells = new Array<Piece>(GRID_SIZE);
  cells[RED_HOME_CENTER] = { token: Token.Base, player: Player.Red };
  cells[BLUE_HOME_CENTER] = { token: Token.Base, player: Player.Blue };
  const hands = {
    [Player.Red]: createHand(),
    [Player.Blue]: createHand(),
  };
  return { cells, hands };
};

/** Try to place a piece. */
const placePiece = (G: G, ctx: Ctx, token: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  if (canPlace(G.cells, G.hands[player], { token, player }, index)) {
    G.cells[index] = { token, player };
    removeFromHand(G.hands[player], token);
  } else {
    return INVALID_MOVE;
  }
};

/** Try to move a piece. */
const movePiece = (G: G, ctx: Ctx, srcIndex: number, destIndex: number) => {
  const player = ctx.currentPlayer as Player;
  if (canMove(G.cells, player, srcIndex, destIndex)) {
    G.cells[destIndex] = G.cells[srcIndex];
    G.cells[srcIndex] = null;
  } else {
    return INVALID_MOVE;
  }
};

/** Try to rotate a piece. */
const rotatePiece = (G: G, ctx: Ctx, token: Token, index: number) =>
  INVALID_MOVE; // TODO: implement rotatePiece

const onTurnEnd = (G: G, ctx: Ctx) => {
  // First pass: capture infiltrated cells.
  for (let index = 0; index < G.cells.length; index++) {
    const piece = G.cells[index];
    if (piece && canBeInfiltrated(G.cells, index)) {
      piece.player = opponentOf(piece.player);
    }
  }
  // Second pass: mark shot and exploded cells as destroyed.
  const destroyed = new Set<number>();
  for (let index = 0; index < G.cells.length; index++) {
    if (
      canBeShot(G.cells, index) ||
      canBeExploded(G.cells, index) ||
      canExplodeEnemy(G.cells, index)
    ) {
      destroyed.add(index);
    }
  }
  // Third pass: return destroyed pieces to their owner's hand.
  for (const index of destroyed) {
    const piece = G.cells[index];
    if (piece) {
      addToHand(G.hands[piece.player], piece.token);
      G.cells[index] = null;
    }
  }
};

/** Represents a game. */
export const game: Game<G, Ctx> = {
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
};
