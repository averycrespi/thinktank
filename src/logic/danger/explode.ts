import { filter } from "../../utils/setOps";
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

/**
 * Check if a token can explode.
 *
 * A token can explode iff:
 * - The token is a mine
 * - The token is adjacent to an explodable enemy token
 */
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
  return Array.from(adjacentTo(index))
    .map((i) => grid[i])
    .some((t) => t && t.owner !== target.owner && EXPLODABLE.has(t.token));
};

/**
 * Check if a token can be exploded by a mine.
 *
 * A token can be exploded by a mine iff:
 * - The token is explodable
 * - The token is adjacent to an exploding mine
 * */
export const canBeExploded = (
  grid: Array<PlacedToken | null>,
  explodingMines: Set<number>,
  index: number
): boolean => {
  if (!isInGrid(index)) {
    return false; // Out of bounds.
  }
  const target = grid[index];
  if (!target || !EXPLODABLE.has(target.token)) {
    return false; // Cell is empty of token is not explodable.
  }
  return filter(adjacentTo(index), (i) => explodingMines.has(i)).size > 0;
};
