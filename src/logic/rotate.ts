import { Cell, Piece, isTank } from ".";

import { GRID_SIZE } from "./grid";

/** Check if a rotation is possible. */
export const canRotate = (
  cells: Array<Cell>,
  { player, token }: Piece,
  index: number
) => {
  const src = cells[index];
  if (!src) {
    return false; // Cannot rotate an empty cell.
  } else if (src.player !== player) {
    return false; // Cannot rotate an opponent's piece.
  } else if (!isTank(src.token) || !isTank(token)) {
    return false; // Only tanks can be rotated.
  } else if (src.token === token) {
    return false; // Cannot rotate a tank to itself.
  } else {
    return true;
  }
};

/** Find all possible rotations for a piece. */
export const possibleRotations = (
  cells: Array<Cell>,
  { player, token }: Piece
): Set<number> => {
  // Optimization: check if the token is a tank.
  if (!isTank(token)) {
    return new Set<number>(); // Only tanks can be rotated.
  }
  // Check every cell in the grid.
  let rotations = new Set<number>();
  for (let index = 0; index < GRID_SIZE; index++) {
    if (canRotate(cells, { player, token }, index)) {
      rotations.add(index);
    }
  }
  return rotations;
};
