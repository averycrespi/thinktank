import { GRID_WIDTH, GRID_HEIGHT, adjacentTo, coordsToIndex } from "./grid";
import { Piece, Player } from ".";

export const canMove = (
  pieces: Array<Piece>,
  player: Player,
  srcIndex: number,
  destIndex: number
): boolean => {
  if (!pieces[srcIndex] || pieces[srcIndex].player !== player) {
    // Cannot move from an empty cell or an enemy piece.
    return false;
  } else if (pieces[destIndex]) {
    // Cannot move to an occupied cell.
    return false;
  } else if (!adjacentTo(srcIndex).has(destIndex)) {
    return false; //TODO: handle movements
  } else {
    return true;
  }
};

export const validMovements = (
  pieces: Array<Piece>,
  player: Player,
  srcIndex: number
): Set<number> => {
  const movements = new Set<number>();
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const destIndex = coordsToIndex({ x, y });
      if (canMove(pieces, player, srcIndex, destIndex)) {
        movements.add(destIndex);
      }
    }
  }
  movements.delete(srcIndex);
  return movements;
};
