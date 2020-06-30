import {
  GRID_HEIGHT,
  GRID_WIDTH,
  coordsToIndex,
  isBlueSpawn,
  isRedSpawn,
} from "./grid";
import { Piece, Player, SimpleToken, simplify } from ".";

import { inDanger } from "./danger";

/** Check if a placement is possible. */
export const canPlace = (
  pieces: Map<number, Piece>,
  hand: Map<SimpleToken, number>,
  { player, token }: Piece,
  index: number
): boolean => {
  if (!hand.get(simplify(token))) {
    return false; // Token must be available in hand.
  } else if (pieces.has(index)) {
    return false; // Cannot place a piece on top of another piece.
  } else if (player === Player.Red && !isRedSpawn(index)) {
    return false; // Red cannot place a piece outside of red spawn.
  } else if (player === Player.Blue && !isBlueSpawn(index)) {
    return false; // Blue cannot place a piece outside of blue spawn.
  }
  // Simulate the placement and check for consequences.
  const potential = new Map(pieces);
  potential.set(index, { player, token });
  // We need to check if ANY of the player's pieces are endangered.
  // For example, placing a mine could endanger pieces adjacent to it.
  for (const [index, piece] of potential.entries()) {
    if (piece.player === player && inDanger(potential, index)) {
      return false; // No-suicide rule: cannot endanger your own piece.
    }
  }
  return true;
};

/** Find all possible placements for a token. */
export const possiblePlacements = (
  pieces: Map<number, Piece>,
  hand: Map<SimpleToken, number>,
  { player, token }: Piece
): Set<number> => {
  // Optimization: pre-check if token is available in hand.
  if (!hand.get(simplify(token))) {
    return new Set<number>();
  }
  let placements = new Set<number>();
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = coordsToIndex({ x, y });
      if (canPlace(pieces, hand, { player, token }, index)) {
        placements.add(index);
      }
    }
  }
  return placements;
};
