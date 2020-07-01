import { BLUE_HOME_CENTER, RED_HOME_CENTER } from "./grid";
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
  let pieces = new Map<number, Piece>();
  pieces.set(RED_HOME_CENTER, { token: Token.Base, player: Player.Red });
  pieces.set(BLUE_HOME_CENTER, { token: Token.Base, player: Player.Blue });
  let hands = new Map<Player, Hand>();
  hands.set(Player.Red, new Hand());
  hands.set(Player.Blue, new Hand());
  return { pieces, hands };
};

const placePiece = (G: G, ctx: Ctx, token: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  const hand = G.hands.get(player)!;
  if (canPlace(G.pieces, hand, { token, player }, index)) {
    G.pieces.set(index, { token, player });
    hand.remove(token);
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: G, ctx: Ctx, srcIndex: number, destIndex: number) => {
  const player = ctx.currentPlayer as Player;
  if (canMove(G.pieces, player, srcIndex, destIndex)) {
    G.pieces.set(destIndex, G.pieces.get(srcIndex)!);
    G.pieces.delete(srcIndex);
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: G, ctx: Ctx, token: Token, index: number) =>
  INVALID_MOVE; // TODO: implement rotatePiece

const onTurnEnd = (G: G, ctx: Ctx) => {
  // First pass: capture infiltrated pieces and mark exploding mines.
  const exploding = new Map<number, Piece>();
  for (const [index, piece] of G.pieces.entries()) {
    if (canBeInfiltrated(G.pieces, index)) {
      piece.player = opponentOf(piece.player);
    } else if (canExplodeSelf(G.pieces, index)) {
      exploding.set(index, piece);
    }
  }
  // Second pass: remove shot and exploded pieces.
  for (const [index, piece] of G.pieces.entries()) {
    if (canBeShot(G.pieces, index) || canBeExploded(G.pieces, index)) {
      G.pieces.delete(index);
      G.hands.get(piece.player)!.add(piece.token);
    }
  }
  // Third pass: remove exploding mines.
  for (const [index, piece] of exploding.entries()) {
    G.pieces.delete(index);
    G.hands.get(piece.player)!.add(piece.token);
  }
};

export const game: Game<G, Ctx> = {
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
};
