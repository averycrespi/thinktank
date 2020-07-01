import { Piece, Player, Token } from ".";
import {
  adjacentTo,
  diagonallyAdjacentTo,
  dualAdjacentTo,
  isHome,
  orthogonallyAdjacentTo,
} from "./grid";

import { filter } from "../utils/setOps";
import { inDanger } from "./danger";

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

/** Check if a movement is possible. */
export const canMove = (
  pieces: Map<number, Piece>,
  player: Player,
  srcIndex: number,
  destIndex: number
): boolean => {
  const src = pieces.get(srcIndex);
  const dest = pieces.get(destIndex);
  if (!src) {
    return false; // Cannot move from an empty cell.
  } else if (src.player !== player) {
    return false; // Cannot move an opponent's piece.
  } else if (dest) {
    return false; // Cannot move to an occupied cell.
  } else if (!reachableFrom(src.token, srcIndex).has(destIndex)) {
    return false; // Must be able to reach the destination.
  }
  // Simulate the movement and check for consequences.
  const potential = new Map(pieces);
  potential.set(destIndex, potential.get(srcIndex)!);
  potential.delete(srcIndex);
  // We need to check if ANY of the player's pieces are endangered.
  // For example, moving a blocker could endanger pieces behind it.
  for (const [index, piece] of potential.entries()) {
    if (piece.player === player && inDanger(potential, index)) {
      return false; // No-suicide rule: cannot endanger your own piece.
    }
  }
  return true;
};

/** Find all possible movements from an index. */
export const possibleMovements = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): Set<number> => {
  // Optimization: check if the cell is occupied.
  const src = pieces.get(index);
  if (!src) {
    return new Set<number>();
  }
  // Optimization: reduce the search space to the reachable indices.
  const movements = new Set<number>();
  const reachable = reachableFrom(src.token, index);
  for (const destIndex of reachable) {
    if (canMove(pieces, player, index, destIndex)) {
      movements.add(destIndex);
    }
  }
  return movements;
};
