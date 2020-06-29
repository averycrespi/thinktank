import {
  adjacentTo,
  orthogonallyAdjacentTo,
  diagonallyAdjacentTo,
  isHome,
  dualAdjacentTo,
} from "./grid";
import { Token, Piece, Player } from ".";
import { filter } from "../utils/setOps";

/** Find all destinations of a token at an index. Does not consider threats. */
const destinationsOf = (token: Token, index: number): Set<number> => {
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
  if (!pieces[srcIndex] || pieces[srcIndex].player !== player) {
    // Cannot move an empty cell or an enemy piece.
    return false;
  } else if (pieces[destIndex]) {
    // Cannot move to an occupied cell.
    return false;
  } else if (!destinationsOf(pieces[srcIndex].token, srcIndex).has(destIndex)) {
    // Destination must be valid.
    return false;
  } else {
    return true;
  }
};

/** Find all valid movements from a source index. */
export const validMovements = (
  pieces: Array<Piece>,
  player: Player,
  srcIndex: number
): Set<number> => {
  const movements = new Set<number>();
  const destinations = destinationsOf(pieces[srcIndex].token, srcIndex);
  // Optimization: reduce the search space to the destinations.
  for (const destIndex of destinations) {
    if (canMove(pieces, player, srcIndex, destIndex)) {
      movements.add(destIndex);
    }
  }
  return movements;
};
