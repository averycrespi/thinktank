import { adjacentTo, isInGrid } from "../grid";
import { PlacedToken, Token } from "../token";

// Defines which tokens can be exploded by mines.
const EXPLODABLE = new Set<Token>([
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
  Token.CardinalInfiltrator,
  Token.DiagonalInfiltrator,
  Token.Mine,
  Token.Base,
]);

/** Check if a mine can explode. */
export const canExplode = (
  grid: Array<PlacedToken | null>,
  index: number
): boolean => {
  if (!isInGrid(index)) {
    return false; // Out of bounds.
  }
  const target = grid[index];
  if (!target || target.token !== Token.Mine) {
    return false; // Cell is empty or token is not a mine.
  }
  for (const adjIndex of adjacentTo(index)) {
    const trigger = grid[adjIndex];
    if (
      trigger &&
      trigger.owner !== target.owner &&
      EXPLODABLE.has(trigger.token)
    ) {
      return true; // Mine is adjacent to an explodable enemy token.
    }
  }
  return false;
};

/** Check if a token can be exploded by a mine. */
export const canBeExploded = (
  grid: Array<PlacedToken | null>,
  index: number
): boolean => {
  if (!isInGrid(index)) {
    return false; // Out of bounds.
  }
  const target = grid[index];
  if (!target || !EXPLODABLE.has(target.token)) {
    return false; // Cell is empty of token is not explodable.
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = grid[adjIndex];
    if (adj && adj.owner !== target.owner && adj.token === Token.Mine) {
      return true; // Token is adjacent to an enemy mine.
    }
  }
  return false;
};
