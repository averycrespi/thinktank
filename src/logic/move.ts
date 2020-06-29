import {
  adjacentTo,
  orthogonallyAdjacentTo,
  diagonallyAdjacentTo,
} from "./grid";
import { Token, Piece, Player } from ".";

/**
 * Find the neighbors of a index.
 * The neighborhood depends on the token at the index.
 */
const neighborsOf = (token: Token, index: number): Set<number> => {
  switch (token) {
    case Token.Blocker:
      return adjacentTo(index);
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return orthogonallyAdjacentTo(index);
    case Token.OrthogonalInfiltrator:
      return orthogonallyAdjacentTo(index);
    case Token.DiagonalInfiltrator:
      return diagonallyAdjacentTo(index);
    case Token.Mine:
      return new Set<number>(); //TODO: implement mine movement
    case Token.Base:
      return adjacentTo(index);
    default:
      return new Set<number>();
  }
};

/**
 * Check if a movement is valid.
 */
export const canMove = (
  pieces: Array<Piece>,
  player: Player,
  srcIndex: number,
  destIndex: number
): boolean => {
  if (!pieces[srcIndex] || pieces[srcIndex].player !== player) {
    // Cannot move an empty cell or an enemy piece.
    return false;
  } else if (pieces[destIndex]) {
    // Cannot move to an occupied cell.
    return false;
  } else if (!neighborsOf(pieces[srcIndex].token, srcIndex).has(destIndex)) {
    // Cannot move outside of the source's neighborhood.
    return false;
  } else {
    return true;
  }
};

/**
 * Find all valid movements from a source index.
 */
export const validMovements = (
  pieces: Array<Piece>,
  player: Player,
  srcIndex: number
): Set<number> => {
  const movements = new Set<number>();
  const neighbors = neighborsOf(pieces[srcIndex].token, srcIndex);
  // Optimization: narrow the search space to the neighborhood.
  for (const destIndex of neighbors) {
    if (canMove(pieces, player, srcIndex, destIndex)) {
      movements.add(destIndex);
    }
  }
  return movements;
};
