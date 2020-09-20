import { BLUE_HOME_CENTER, GRID_SIZE, RED_HOME_CENTER } from "./grid";
import { Ctx, Game } from "boardgame.io";
import {
  Event,
  EventKind,
  G,
  Piece,
  Player,
  Result,
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
import { canRotate } from "./rotate";

const setup = (): G => {
  let cells = new Array<Piece>(GRID_SIZE);
  cells[RED_HOME_CENTER] = { token: Token.Base, player: Player.Red };
  cells[BLUE_HOME_CENTER] = { token: Token.Base, player: Player.Blue };
  const hands = {
    [Player.Red]: createHand(),
    [Player.Blue]: createHand(),
  };
  const events = new Array<Event>();
  return { cells, hands, events };
};

const placePiece = (G: G, ctx: Ctx, token: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  if (canPlace(G.cells, G.hands[player], { token, player }, index)) {
    G.events.push({
      kind: EventKind.PlacePiece,
      player,
      piece: { token, player },
    });
    G.cells[index] = { token, player };
    removeFromHand(G.hands[player], token);
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: G, ctx: Ctx, srcIndex: number, destIndex: number) => {
  const player = ctx.currentPlayer as Player;
  if (canMove(G.cells, player, srcIndex, destIndex)) {
    G.events.push({
      kind: EventKind.MovePiece,
      player,
      piece: G.cells[srcIndex] as Piece,
    });
    G.cells[destIndex] = G.cells[srcIndex];
    G.cells[srcIndex] = null;
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: G, ctx: Ctx, token: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  if (canRotate(G.cells, { player, token }, index)) {
    G.events.push({
      kind: EventKind.RotatePiece,
      player,
      piece: G.cells[index] as Piece,
    });
    G.cells[index] = { player, token };
  } else {
    return INVALID_MOVE;
  }
};

const onTurnEnd = (G: G, ctx: Ctx) => {
  // First pass: capture infiltrated cells.
  for (let index = 0; index < G.cells.length; index++) {
    const piece = G.cells[index];
    // Can the piece be infiltrated?
    // A piece can only be infiltrated once per turn.
    if (piece && canBeInfiltrated(G.cells, index)) {
      G.events.push({
        kind: EventKind.CapturePiece,
        player: opponentOf(piece.player),
        // Copy piece to avoid mutation.
        piece: { player: piece.player, token: piece.token },
      });
      piece.player = opponentOf(piece.player);
    }
  }
  // Second pass: mark shot and exploded cells as destroyed.
  const destroyed = new Set<number>();
  for (let index = 0; index < G.cells.length; index++) {
    const piece = G.cells[index];
    // Can the piece by shot?
    if (piece && canBeShot(G.cells, index)) {
      G.events.push({
        kind: EventKind.ShootPiece,
        player: opponentOf(piece.player),
        piece,
      });
      destroyed.add(index);
      // Can the piece be exploded?
    } else if (piece && canBeExploded(G.cells, index)) {
      G.events.push({
        kind: EventKind.ExplodePiece,
        player: opponentOf(piece.player),
        piece,
      });
      destroyed.add(index);
      // Will the piece explode itself?
    } else if (piece && canExplodeEnemy(G.cells, index)) {
      G.events.push({
        kind: EventKind.ExplodePiece,
        player: piece.player,
        piece,
      });
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

const endIf = (G: G, ctx: Ctx): Result | void => {
  // A player loses if their hand contains their base.
  const players = [Player.Red, Player.Blue];
  for (const player of players) {
    if (G.hands[player].some((t) => t === Token.Base)) {
      return { winner: opponentOf(player) };
    }
  }
};

/** Represents a game. */
export const game: Game<G, Ctx> = {
  name: "thinktank",
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
  endIf: endIf,
};
