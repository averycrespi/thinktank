import { adjacentTo, isInGrid } from "../grid";
import { PlacedToken, Token } from "../token";

// Defines which tokens can be captured by infiltrators.
const CAPTURABLE = new Set<Token>([
  Token.Blocker,
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
]);

/** Check if a token can be captured by an enemy infiltrator. */
export const canBeCaptured = (
  grid: Array<PlacedToken | null>,
  index: number
): boolean => {
  if (!isInGrid(index)) {
    return false; // Out of bounds.
  }
  const target = grid[index];
  if (!target || !CAPTURABLE.has(target.token)) {
    return false; // Cell is empty or piece is not capturable.
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = grid[adjIndex];
    if (
      adj &&
      adj.owner !== target.owner &&
      (adj.token === Token.CardinalInfiltrator ||
        adj.token === Token.DiagonalInfiltrator)
    ) {
      return true; // Token is adjacent to an enemy infiltrator.
    }
  }
  return false;
};
