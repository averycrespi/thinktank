import {
  GRID_WIDTH,
  GRID_HEIGHT,
  coordsToIndex,
  isBlueSpawn,
  isRedSpawn,
} from "./grid";
import { Piece, Player, Token } from ".";

/**
 * Check if a placement is valid.
 */
export const canPlace = (
  pieces: Array<Piece>,
  player: Player,
  token: Token,
  index: number
): boolean => {
  if (pieces[index]) {
    // Cannot place a piece on top of another piece.
    return false;
  } else if (player === Player.Red && !isRedSpawn(index)) {
    // Red cannot place a piece outside of red spawn.
    return false;
  } else if (player === Player.Blue && !isBlueSpawn(index)) {
    // Blue cannot place a piece outside of blue spawn.
    return false;
  } else {
    return true;
  }
};

/**
 * Find all valid placements for a token.
 */
export const validPlacements = (
  pieces: Array<Piece>,
  player: Player,
  token: Token
): Set<number> => {
  let placements = new Set<number>();
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = coordsToIndex({ x, y });
      if (canPlace(pieces, player, token, index)) {
        placements.add(index);
      }
    }
  }
  return placements;
};
