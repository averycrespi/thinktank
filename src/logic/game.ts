import { BLUE_HOME_CENTER, RED_HOME_CENTER } from "./grid";
import { Hand, Piece, Player, Token, opponentOf } from ".";
import {
  canBeExploded,
  canBeInfiltrated,
  canBeShot,
  canExplodeSelf,
} from "./danger";

import { INVALID_MOVE } from "boardgame.io/core";
import { canMove } from "./move";
import { canPlace } from "./place";

const setup = () => {
  let pieces = new Map<number, Piece>();
  pieces.set(RED_HOME_CENTER, { token: Token.Base, player: Player.Red });
  pieces.set(BLUE_HOME_CENTER, { token: Token.Base, player: Player.Blue });
  let hands = new Map<Player, Hand>();
  hands.set(Player.Red, new Hand());
  hands.set(Player.Blue, new Hand());
  return { pieces, hands };
};

const placePiece = (G: any, ctx: any, token: Token, index: number) => {
  const pieces: Map<number, Piece> = G.pieces;
  const player: Player = ctx.currentPlayer;
  const hand: Hand = G.hands.get(player);
  if (canPlace(pieces, hand, { token, player }, index)) {
    pieces.set(index, { token, player });
    hand.remove(token);
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: any, ctx: any, srcIndex: number, destIndex: number) => {
  const pieces: Map<number, Piece> = G.pieces;
  const player: Player = ctx.currentPlayer;
  if (canMove(pieces, player, srcIndex, destIndex)) {
    pieces.set(destIndex, pieces.get(srcIndex)!);
    pieces.delete(srcIndex);
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: any, ctx: any, token: Token, index: number) =>
  INVALID_MOVE; // TODO: implement rotatePiece

const onTurnEnd = (G: any, ctx: any) => {
  const pieces: Map<number, Piece> = G.pieces;
  const hands: Map<Player, Hand> = G.hands;
  // First pass: capture infiltrated pieces and mark exploding mines.
  const exploding = new Map<number, Piece>();
  for (const [index, piece] of pieces.entries()) {
    if (canBeInfiltrated(pieces, index)) {
      piece.player = opponentOf(piece.player);
    } else if (canExplodeSelf(pieces, index)) {
      exploding.set(index, piece);
    }
  }
  // Second pass: remove shot and exploded pieces.
  for (const [index, piece] of pieces.entries()) {
    if (canBeShot(pieces, index) || canBeExploded(pieces, index)) {
      pieces.delete(index);
      hands.get(piece.player)!.remove(piece.token);
    }
  }
  // Third pass: remove exploding mines.
  for (const [index, piece] of exploding.entries()) {
    pieces.delete(index);
    hands.get(piece.player)!.remove(piece.token);
  }
};

const Game = {
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
};

export default Game;
