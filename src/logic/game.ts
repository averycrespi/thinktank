import { BLUE_HOME_CENTER, GRID_SIZE, RED_HOME_CENTER } from "./grid";
import { Ctx, Game } from "boardgame.io";
import { G, Hand, Piece, Player, Token, opponentOf } from ".";
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
  let hands = new Map<Player, Hand>();
  hands.set(Player.Red, new Hand());
  hands.set(Player.Blue, new Hand());
  return { cells, hands };
};

const placePiece = (G: G, ctx: Ctx, token: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  const hand = G.hands.get(player)!;
  if (canPlace(G.cells, hand, { token, player }, index)) {
    G.cells[index] = { token, player };
    hand.remove(token);
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
      G.hands.get(piece.player)!.add(piece.token);
    }
  }
  // Third pass: remove exploding mines.
  for (const [index, piece] of exploding.entries()) {
    G.cells[index] = null;
    G.hands.get(piece.player)!.add(piece.token);
  }
};

export const game: Game<G, Ctx> = {
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
};
