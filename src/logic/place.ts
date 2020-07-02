import {
  GRID_HEIGHT,
  GRID_WIDTH,
  coordsToIndex,
  isBlueSpawn,
  isRedSpawn,
} from "./grid";
import { Hand, Piece, Player } from ".";

import { inDanger } from "./danger";

/** Check if a placement is possible. */
export const canPlace = (
  cells: Array<Piece | null>,
  hand: Hand,
  { player, token }: Piece,
  index: number
): boolean => {
  if (!hand.has(token)) {
    return false; // Token must be in hand.
  } else if (cells[index]) {
    return false; // Cannot place a piece on top of another piece.
  } else if (player === Player.Red && !isRedSpawn(index)) {
    return false; // Red cannot place a piece outside of red spawn.
  } else if (player === Player.Blue && !isBlueSpawn(index)) {
    return false; // Blue cannot place a piece outside of blue spawn.
  }
  // Simulate the placement and check for consequences.
  const potential = [...cells];
  potential[index] = { player, token };
  // We need to check if ANY of the player's cells are endangered.
  // For example, placing a mine could endanger cells adjacent to it.
  for (let index = 0; index < potential.length; index++) {
    const piece = potential[index];
    if (!piece) {
      continue;
    } else if (piece.player === player && inDanger(potential, index)) {
      return false; // No-suicide rule: cannot endanger your own piece.
    }
  }
  return true;
};

/** Find all possible placements for a token. */
export const possiblePlacements = (
  cells: Array<Piece | null>,
  hand: Hand,
  { player, token }: Piece
): Set<number> => {
  // Optimization: check if token is in hand.
  if (!hand.has(token)) {
    return new Set<number>();
  }
  let placements = new Set<number>();
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = coordsToIndex({ x, y });
      if (canPlace(cells, hand, { player, token }, index)) {
        placements.add(index);
      }
    }
  }
  return placements;
};
