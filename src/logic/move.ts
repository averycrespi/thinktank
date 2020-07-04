import { Cell, Player, Token } from ".";
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
  cells: Array<Cell>,
  player: Player,
  srcIndex: number,
  destIndex: number
): boolean => {
  const src = cells[srcIndex];
  const dest = cells[destIndex];
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
  const simulated = [...cells];
  simulated[destIndex] = simulated[srcIndex];
  simulated[srcIndex] = null;
  // We need to check if ANY of the player's pieces are endangered.
  // For example, moving a blocker could endanger a piece behind it.
  for (let index = 0; index < simulated.length; index++) {
    const piece = simulated[index];
    if (!piece) {
      continue;
    } else if (piece.player === player && inDanger(simulated, index)) {
      return false; // No-suicide rule: cannot endanger your own piece.
    }
  }
  return true;
};

/** Find all possible movements from an index. */
export const possibleMovements = (
  cells: Array<Cell>,
  player: Player,
  srcIndex: number
): Set<number> => {
  // Optimization: check if the source cell is occupied.
  const src = cells[srcIndex];
  if (!src) {
    return new Set<number>();
  }
  // Optimization: reduce the search space to the reachable indices.
  const movements = new Set<number>();
  const reachable = reachableFrom(src.token, srcIndex);
  for (const destIndex of reachable) {
    if (canMove(cells, player, srcIndex, destIndex)) {
      movements.add(destIndex);
    }
  }
  return movements;
};
