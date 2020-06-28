import {
  NUM_COLS,
  NUM_ROWS,
  coordsToIndex,
  isBlueSpawn,
  isRedSpawn,
} from "./grid";
import { Piece, Player, Token } from ".";

export const canPlace = (
  pieces: Array<Piece>,
  player: Player,
  token: Token,
  index: number
): boolean => {
  if (pieces[index]) {
    return false;
  } else if (player === Player.Red && !isRedSpawn(index)) {
    return false;
  } else if (player === Player.Blue && !isBlueSpawn(index)) {
    return false;
  } else {
    return true;
  }
};

export const validPlacements = (
  pieces: Array<Piece>,
  player: Player,
  token: Token
): Set<number> => {
  let placements = new Set<number>();
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      const index = coordsToIndex({ x, y });
      if (canPlace(pieces, player, token, index)) {
        placements.add(index);
      }
    }
  }
  return placements;
};
