import {
  GRID_HEIGHT,
  GRID_WIDTH,
  adjacentTo,
  coordsToIndex,
  diagonallyAdjacentTo,
  indexToCoords,
  orthogonallyAdjacentTo,
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
  pieces: Map<number, Piece>,
  destIndex: number,
  srcIndices: Array<number>,
  tank: Token.UpTank | Token.DownTank | Token.RightTank | Token.LeftTank
): boolean => {
  const dest = pieces.get(destIndex);
  if (!dest || !SHOOTABLE.has(dest.token)) {
    return false;
  }
  for (const srcIndex of srcIndices) {
    const src = pieces.get(srcIndex);
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
  pieces: Map<number, Piece>,
  index: number
): boolean => {
  const { x, y: destY } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let y = destY + 1; y < GRID_HEIGHT; y++) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(pieces, index, srcIndices, Token.UpTank);
};

/** Check if a piece can be shot from above. */
const canBeShotFromAbove = (
  pieces: Map<number, Piece>,
  index: number
): boolean => {
  const { x, y: destY } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let y = destY - 1; y >= 0; y--) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(pieces, index, srcIndices, Token.DownTank);
};

/** Check if a piece can be shot from the right. */
const canBeShotFromRight = (
  pieces: Map<number, Piece>,
  index: number
): boolean => {
  const { x: destX, y } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let x = destX + 1; x < GRID_WIDTH; x++) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(pieces, index, srcIndices, Token.LeftTank);
};

/** Check if a piece can be shot from the left. */
const canBeShotFromLeft = (
  pieces: Map<number, Piece>,
  index: number
): boolean => {
  const { x: destX, y } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let x = destX - 1; x >= 0; x--) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(pieces, index, srcIndices, Token.RightTank);
};

/** Check if a piece can be shot. */
export const canBeShot = (pieces: Map<number, Piece>, index: number): boolean =>
  canBeShotFromBelow(pieces, index) ||
  canBeShotFromAbove(pieces, index) ||
  canBeShotFromRight(pieces, index) ||
  canBeShotFromLeft(pieces, index);

// Define which tokens can be infiltrated.
const INFILTRATABLE = new Set<Token>([
  Token.Blocker,
  Token.UpTank,
  Token.DownTank,
  Token.LeftTank,
  Token.RightTank,
]); // TODO: can bases be infiltrated?

/** Check if a piece can be infiltrated. */
export const canBeInfiltrated = (
  pieces: Map<number, Piece>,
  index: number
): boolean => {
  const dest = pieces.get(index);
  if (!dest || !INFILTRATABLE.has(dest.token)) {
    return false;
  }
  // Check for orthogonal infiltration.
  for (const adjIndex of orthogonallyAdjacentTo(index)) {
    const src = pieces.get(adjIndex);
    if (
      src &&
      src.player !== dest.player &&
      src.token === Token.OrthogonalInfiltrator
    ) {
      return true;
    }
  }
  // Check for diagonal infiltration.
  for (const adjIndex of diagonallyAdjacentTo(index)) {
    const src = pieces.get(adjIndex);
    if (
      src &&
      src.player !== dest.player &&
      src.token === Token.DiagonalInfiltrator
    ) {
      return true;
    }
  }
  return false;
};

// Define which tokens can be exploded.
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
  pieces: Map<number, Piece>,
  index: number
): boolean => {
  const dest = pieces.get(index);
  if (!dest || !EXPLODABLE.has(dest.token)) {
    return false;
  }
  for (const adjIndex of adjacentTo(index)) {
    const src = pieces.get(adjIndex);
    if (src && src.player !== dest.player && src.token === Token.Mine) {
      return true;
    }
  }
  return false;
};

/** Check if a piece can explode itself. */
export const canExplodeSelf = (
  pieces: Map<number, Piece>,
  index: number
): boolean => {
  const mine = pieces.get(index);
  if (!mine || mine.token !== Token.Mine) {
    return false;
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = pieces.get(adjIndex);
    if (adj && adj.player !== mine.player) {
      return true;
    }
  }
  return false;
};

/** Check if a piece can explode an ally. */
const canExplodeAlly = (pieces: Map<number, Piece>, index: number): boolean => {
  const mine = pieces.get(index);
  if (!mine || !canExplodeSelf(pieces, index)) {
    return false;
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = pieces.get(adjIndex);
    if (adj && adj.player === mine.player && EXPLODABLE.has(adj.token)) {
      return true;
    }
  }
  return false;
};

/** Check if a piece or its ally is in danger. */
export const inDanger = (pieces: Map<number, Piece>, index: number): boolean =>
  canBeShot(pieces, index) ||
  canBeInfiltrated(pieces, index) ||
  // Mines are allowed to explode themselves.
  (!canExplodeSelf(pieces, index) && canBeExploded(pieces, index)) ||
  canExplodeAlly(pieces, index);
