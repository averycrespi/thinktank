import {
  GRID_HEIGHT,
  GRID_WIDTH,
  adjacentTo,
  coordsToIndex,
  indexToCoords,
} from "./grid";
import { Piece, Token } from ".";

// Defines which tokens can be shot.
const SHOOTABLE = new Set<Token>([
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
  Token.OrthogonalInfiltrator,
  Token.DiagonalInfiltrator,
  Token.Mine,
  Token.Base,
]);

/** Check if piece is in the line of fire. */
const inLineOfFire = (
  cells: Array<Piece | null>,
  destIndex: number,
  srcIndices: Array<number>,
  tank: Token.UpTank | Token.DownTank | Token.RightTank | Token.LeftTank
): boolean => {
  const dest = cells[destIndex];
  if (!dest || !SHOOTABLE.has(dest.token)) {
    return false;
  }
  for (const srcIndex of srcIndices) {
    const src = cells[srcIndex];
    if (!src) {
      continue; // Keep looking for a tank or blocker.
    } else if (src.player !== dest.player && src.token === tank) {
      return true; // Threatened by an opponent's tank.
    } else if (src.player === dest.player && src.token === Token.Blocker) {
      return false; // Protected by an ally blocker.
    }
  }
  return false;
};

/** Check if a piece can be shot from below. */
const canBeShotFromBelow = (
  cells: Array<Piece | null>,
  index: number
): boolean => {
  const { x, y: destY } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let y = destY + 1; y < GRID_HEIGHT; y++) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.UpTank);
};

/** Check if a piece can be shot from above. */
const canBeShotFromAbove = (
  cells: Array<Piece | null>,
  index: number
): boolean => {
  const { x, y: destY } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let y = destY - 1; y >= 0; y--) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.DownTank);
};

/** Check if a piece can be shot from the right. */
const canBeShotFromRight = (
  cells: Array<Piece | null>,
  index: number
): boolean => {
  const { x: destX, y } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let x = destX + 1; x < GRID_WIDTH; x++) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.LeftTank);
};

/** Check if a piece can be shot from the left. */
const canBeShotFromLeft = (
  cells: Array<Piece | null>,
  index: number
): boolean => {
  const { x: destX, y } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let x = destX - 1; x >= 0; x--) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.RightTank);
};

/** Check if a piece can be shot. */
export const canBeShot = (cells: Array<Piece | null>, index: number): boolean =>
  canBeShotFromBelow(cells, index) ||
  canBeShotFromAbove(cells, index) ||
  canBeShotFromRight(cells, index) ||
  canBeShotFromLeft(cells, index);

// Defines which tokens can be infiltrated.
const INFILTRATABLE = new Set<Token>([
  Token.Blocker,
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
]);

/** Check if a piece can be infiltrated. */
export const canBeInfiltrated = (
  cells: Array<Piece | null>,
  index: number
): boolean => {
  const dest = cells[index];
  if (!dest || !INFILTRATABLE.has(dest.token)) {
    return false;
  }
  for (const adjIndex of adjacentTo(index)) {
    const src = cells[adjIndex];
    if (
      src &&
      src.player !== dest.player &&
      (src.token === Token.OrthogonalInfiltrator ||
        src.token === Token.DiagonalInfiltrator)
    ) {
      return true;
    }
  }
  return false;
};

// Defines which tokens can be exploded.
const EXPLODABLE = new Set<Token>([
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
  Token.OrthogonalInfiltrator,
  Token.DiagonalInfiltrator,
  Token.Mine,
  Token.Base,
]);

/** Check if a piece can be exploded. */
export const canBeExploded = (
  cells: Array<Piece | null>,
  index: number
): boolean => {
  const dest = cells[index];
  if (!dest || !EXPLODABLE.has(dest.token)) {
    return false;
  }
  for (const adjIndex of adjacentTo(index)) {
    const src = cells[adjIndex];
    if (src && src.player !== dest.player && src.token === Token.Mine) {
      return true;
    }
  }
  return false;
};

/** Check if a piece can explode itself. */
export const canExplodeSelf = (
  cells: Array<Piece | null>,
  index: number
): boolean => {
  const mine = cells[index];
  if (!mine || mine.token !== Token.Mine) {
    return false;
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = cells[adjIndex];
    if (adj && adj.player !== mine.player) {
      return true;
    }
  }
  return false;
};

/** Check if a piece can explode an ally. */
const canExplodeAlly = (cells: Array<Piece | null>, index: number): boolean => {
  const mine = cells[index];
  if (!mine || !canExplodeSelf(cells, index)) {
    return false;
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = cells[adjIndex];
    if (adj && adj.player === mine.player && EXPLODABLE.has(adj.token)) {
      return true;
    }
  }
  return false;
};

/** Check if a piece or its ally is in danger. */
export const inDanger = (cells: Array<Piece | null>, index: number): boolean =>
  canBeShot(cells, index) ||
  canBeInfiltrated(cells, index) ||
  // Mines are allowed to explode themselves.
  (!canExplodeSelf(cells, index) && canBeExploded(cells, index)) ||
  canExplodeAlly(cells, index);
