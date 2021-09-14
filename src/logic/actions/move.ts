import { deepCopy } from "../../utils/deepCopy";
import { filter } from "../../utils/setOps";
import {
  adjacentTo,
  cardinallyAdjacentTo,
  diagonallyAdjacentTo,
  dualAdjacentTo,
  isInGrid,
  isInHome,
} from "../grid";
import { Player } from "../player";
import { advanceState, GameState } from "../state";
import { PlacedToken, Token } from "../token";

/**
 * Find all indices that are reachable by a token from an index.
 *
 * Does NOT validate that the reachable indices are safe or unoccupied.
 */
const reachableFrom = (token: Token, index: number): Set<number> => {
  switch (token) {
    case Token.Blocker:
      return filter(adjacentTo(index), (i) => !isInHome(i));
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return filter(cardinallyAdjacentTo(index), (i) => !isInHome(i));
    case Token.CardinalInfiltrator:
      return filter(cardinallyAdjacentTo(index), (i) => !isInHome(i));
    case Token.DiagonalInfiltrator:
      return filter(diagonallyAdjacentTo(index), (i) => !isInHome(i));
    case Token.Mine:
      return filter(dualAdjacentTo(index), (i) => !isInHome(i));
    case Token.Base:
      return filter(adjacentTo(index), (i) => isInHome(i));
  }
};

/**
 * Check if a movement is legal.
 *
 * Does NOT validate that the destination index is safe.
 */
const isLegalMovement = (
  grid: Array<PlacedToken | null>,
  player: Player,
  srcIndex: number,
  destIndex: number
): boolean => {
  if (!isInGrid(srcIndex) || !isInGrid(destIndex)) {
    return false; // Out of bounds.
  }
  const src = grid[srcIndex];
  const dest = grid[destIndex];
  if (!src) {
    return false; // Cannot move from an empty cell.
  } else if (src.owner !== player) {
    return false; // Cannot move an opponent's token.
  } else if (dest) {
    return false; // Cannot move to an occupied cell.
  } else if (!reachableFrom(src.token, srcIndex).has(destIndex)) {
    return false; // Must be able to reach the destination.
  } else {
    return true;
  }
};

/** Move a token from a source index to a destination index, returning an updated game state iff the movement is valid. */
export const moveToken = (
  state: GameState,
  player: Player,
  srcIndex: number,
  destIndex: number
): GameState | null => {
  if (!isLegalMovement(state.grid, player, srcIndex, destIndex)) {
    return null;
  }
  const newState = deepCopy(state);
  newState.grid[destIndex] = newState.grid[srcIndex];
  newState.grid[srcIndex] = null;
  return advanceState(newState, player);
};

/** Check if a token can be moved from a source index to a destination index. */
export const canMoveToken = (
  state: GameState,
  player: Player,
  srcIndex: number,
  destIndex: number
): boolean => moveToken(state, player, srcIndex, destIndex) !== null;

/** Find all possible destination indices that the token at the source index could move to. */
export const possibleMovements = (
  state: GameState,
  player: Player,
  srcIndex: number
): Set<number> => {
  const destinations = new Set<number>();
  if (!isInGrid(srcIndex)) {
    return destinations; // Optimization: Out of bounds.
  }
  const src = state.grid[srcIndex];
  if (!src) {
    return destinations; // Optimization: Cannot move from an empty cell.
  }
  const reachable = reachableFrom(src.token, srcIndex);
  for (const destIndex of reachable) {
    if (canMoveToken(state, player, srcIndex, destIndex)) {
      destinations.add(destIndex);
    }
  }
  return destinations;
};
