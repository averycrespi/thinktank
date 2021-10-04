import { Direction, isInGrid, lineFrom } from "../grid";
import { PlacedToken, Token } from "../token";

// Defines which tokens can be shot by tanks.
const SHOOTABLE = new Set<Token>([
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
  Token.CardinalInfiltrator,
  Token.DiagonalInfiltrator,
  Token.Mine,
  Token.Base,
]);

/**
 * Check if a token can be shot by a specific type of enemy tank from a set of indices.
 *
 * Optimization: we assume that the token is present and shootable.
 * This invariant is upheld by the only caller, canBeShot.
 */
const canBeShotFrom = (
  grid: Array<PlacedToken | null>,
  srcIndices: Array<number>,
  targetIndex: number,
  tank: Token.UpTank | Token.DownTank | Token.RightTank | Token.LeftTank
): boolean => {
  const target = grid[targetIndex]!;
  for (const srcIndex of srcIndices) {
    const src = grid[srcIndex];
    if (!src) {
      continue; // Keep looking for a tank or blocker.
    } else if (src.owner !== target.owner && src.token === tank) {
      return true; // Token is in the line of fire of an enemy tank.
    } else if (src.owner === target.owner && src.token === Token.Blocker) {
      return false; // Token is protected by a friendly blocker.
    }
  }
  return false;
};

/** Check if a token at an index can be shot by an enemy tank. */
export const canBeShot = (
  grid: Array<PlacedToken | null>,
  index: number
): boolean => {
  if (!isInGrid(index)) {
    return false; // Out of bounds.
  }
  const target = grid[index];
  if (!target || !SHOOTABLE.has(target.token)) {
    return false; // Cell is empty or token is not shootable.
  }
  return (
    canBeShotFrom(grid, lineFrom(index, Direction.Up), index, Token.DownTank) ||
    canBeShotFrom(grid, lineFrom(index, Direction.Down), index, Token.UpTank) ||
    canBeShotFrom(
      grid,
      lineFrom(index, Direction.Left),
      index,
      Token.RightTank
    ) ||
    canBeShotFrom(grid, lineFrom(index, Direction.Right), index, Token.LeftTank)
  );
};
