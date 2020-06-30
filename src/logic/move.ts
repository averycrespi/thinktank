import {
  adjacentTo,
  orthogonallyAdjacentTo,
  diagonallyAdjacentTo,
  isHome,
  dualAdjacentTo,
} from "./grid";
import { Token, Piece, Player } from ".";
import { filter } from "../utils/setOps";
import { isThreatened } from "./threat";

/** Find all indices that are reachable from a piece. */
const reachableFrom = (token: Token, index: number): Set<number> => {
  switch (token) {
    case Token.Blocker:
      return filter(adjacentTo(index), (i) => !isHome(i));
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return filter(orthogonallyAdjacentTo(index), (i) => !isHome(i));
    case Token.OrthogonalInfiltrator:
      return filter(orthogonallyAdjacentTo(index), (i) => !isHome(i));
    case Token.DiagonalInfiltrator:
      return filter(diagonallyAdjacentTo(index), (i) => !isHome(i));
    case Token.Mine:
      return filter(dualAdjacentTo(index), (i) => !isHome(i));
    case Token.Base:
      return filter(adjacentTo(index), (i) => isHome(i));
    default:
      return new Set<number>();
  }
};

/** Check if a movement is valid. */
export const canMove = (
  pieces: Array<Piece>,
  player: Player,
  srcIndex: number,
  destIndex: number
): boolean => {
  const token = pieces[srcIndex].token;
  if (!pieces[srcIndex] || pieces[srcIndex].player !== player) {
    return false; // Cannot move an empty cell or an opponent piece.
  } else if (pieces[destIndex]) {
    return false; // Cannot move to an occupied cell.
  } else if (!reachableFrom(token, srcIndex).has(destIndex)) {
    return false; // Must be able to reach the destination.
  } else if (isThreatened(pieces, player, token, destIndex)) {
    return false; // Cannot move to a threatened destination.
  } else {
    return true;
  }
};

/** Find all valid movements from an index. */
export const validMovements = (
  pieces: Array<Piece>,
  player: Player,
  srcIndex: number
): Set<number> => {
  const movements = new Set<number>();
  const reachable = reachableFrom(pieces[srcIndex].token, srcIndex);
  // Optimization: reduce the search space to the reachable indices.
  for (const destIndex of reachable) {
    if (canMove(pieces, player, srcIndex, destIndex)) {
      movements.add(destIndex);
    }
  }
  return movements;
};
