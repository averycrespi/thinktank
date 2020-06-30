import {
  GRID_HEIGHT,
  GRID_WIDTH,
  coordsToIndex,
  isBlueSpawn,
  isRedSpawn,
} from "./grid";
import { Piece, Player, SimpleToken, simplify } from ".";

import { isThreatened } from "./threat";

/** Check if a placement is possible. */
export const canPlace = (
  pieces: Map<number, Piece>,
  hand: Map<SimpleToken, number>,
  { player, token }: Piece,
  index: number
): boolean => {
  if (pieces.has(index)) {
    return false; // Cannot place a piece on top of another piece.
  } else if (player === Player.Red && !isRedSpawn(index)) {
    return false; // Red cannot place a piece outside of red spawn.
  } else if (player === Player.Blue && !isBlueSpawn(index)) {
    return false; // Blue cannot place a piece outside of blue spawn.
  } else if (isThreatened(pieces, { player, token }, index)) {
    return false; // Cannot place a piece at a threatened index.
  } else if (!hand.get(simplify(token))) {
    return false; // Token must be available in hand.
  } else {
    return true;
  }
};

/** Find all possible placements for a token. */
export const possiblePlacements = (
  pieces: Map<number, Piece>,
  hand: Map<SimpleToken, number>,
  { player, token }: Piece
): Set<number> => {
  if (!hand.get(simplify(token))) {
    return new Set<number>(); // Token must be available in hand.
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
