import { adjacentTo, isInGrid } from "../grid";
import { isInfiltrator, PlacedToken, Token } from "../token";

// Defines which tokens can be captured by infiltrators.
const CAPTURABLE = new Set<Token>([
  Token.Blocker,
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
  Token.Base,
]);

/**
 * Check if a token can be captured by an enemy infiltrator.
 *
 * A token can be captured iff:
 * - The token is capturable
 * - The token is not adjacent to a friendly infiltrator
 * - The token is adjacent to an enemy infiltrator
 */
export const canBeCaptured = (
  grid: Array<PlacedToken | null>,
  index: number
): boolean => {
  if (!isInGrid(index)) {
    return false; // Out of bounds.
  }
  const target = grid[index];
  if (!target || !CAPTURABLE.has(target.token)) {
    return false; // Cell is empty or token is not capturable.
  }
  const adjacentInfiltrators = Array.from(adjacentTo(index))
    .map((i) => grid[i])
    .filter((t) => t && isInfiltrator(t.token));
  if (adjacentInfiltrators.some((t) => t && t.owner === target.owner)) {
    return false; // Token is protected by friendly infiltrator.
  } else if (adjacentInfiltrators.some((t) => t && t.owner !== target.owner)) {
    return true; // Token is adjacent to enemy infiltrator.
  } else {
    return false;
  }
};
