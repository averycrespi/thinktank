import { Cell, Token } from ".";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  adjacentTo,
  coordsToIndex,
  indexToCoords,
} from "./grid";

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

/** Check if a piece is in the line of fire of an enemy tank. */
const inLineOfFire = (
  cells: Array<Cell>,
  destIndex: number,
  srcIndices: Array<number>,
  tank: Token.UpTank | Token.DownTank | Token.RightTank | Token.LeftTank
): boolean => {
  const dest = cells[destIndex];
  if (!dest || !SHOOTABLE.has(dest.token)) {
    return false; // Cell is empty or piece is not shootable.
  }
  for (const srcIndex of srcIndices) {
    const src = cells[srcIndex];
    if (!src) {
      continue; // Keep looking for a tank or blocker.
    } else if (src.player !== dest.player && src.token === tank) {
      return true; // Piece is in the line of fire of an enemy tank.
    } else if (src.player === dest.player && src.token === Token.Blocker) {
      return false; // Piece is protected by a friendly blocker.
    }
  }
  return false;
};

/** Check if a piece can be shot from below. */
const canBeShotFromBelow = (cells: Array<Cell>, index: number): boolean => {
  const { x, y: destY } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let y = destY + 1; y < GRID_HEIGHT; y++) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.UpTank);
};

/** Check if a piece can be shot from above. */
const canBeShotFromAbove = (cells: Array<Cell>, index: number): boolean => {
  const { x, y: destY } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let y = destY - 1; y >= 0; y--) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.DownTank);
};

/** Check if a piece can be shot from the right. */
const canBeShotFromRight = (cells: Array<Cell>, index: number): boolean => {
  const { x: destX, y } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let x = destX + 1; x < GRID_WIDTH; x++) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.LeftTank);
};

/** Check if a piece can be shot from the left. */
const canBeShotFromLeft = (cells: Array<Cell>, index: number): boolean => {
  const { x: destX, y } = indexToCoords(index);
  const srcIndices = new Array<number>();
  for (let x = destX - 1; x >= 0; x--) {
    srcIndices.push(coordsToIndex({ x, y }));
  }
  return inLineOfFire(cells, index, srcIndices, Token.RightTank);
};

/** Check if a piece can be shot. */
export const canBeShot = (cells: Array<Cell>, index: number): boolean =>
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
  cells: Array<Cell>,
  index: number
): boolean => {
  const dest = cells[index];
  if (!dest || !INFILTRATABLE.has(dest.token)) {
    return false; // Cell is empty or piece is not infiltratable.
  }
  for (const adjIndex of adjacentTo(index)) {
    const src = cells[adjIndex];
    if (
      src &&
      src.player !== dest.player &&
      (src.token === Token.OrthogonalInfiltrator ||
        src.token === Token.DiagonalInfiltrator)
    ) {
      return true; // Piece is adjacent to an enemy infiltrator.
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
export const canBeExploded = (cells: Array<Cell>, index: number): boolean => {
  const dest = cells[index];
  if (!dest || !EXPLODABLE.has(dest.token)) {
    return false; // Cell is empty or piece is not explodable.
  }
  for (const adjIndex of adjacentTo(index)) {
    const src = cells[adjIndex];
    if (src && src.player !== dest.player && src.token === Token.Mine) {
      return true; // Piece is adjacent to an enemy mine.
    }
  }
  return false;
};

/** Check if a piece can explode an enemy piece. */
export const canExplodeEnemy = (cells: Array<Cell>, index: number): boolean => {
  const mine = cells[index];
  if (!mine || mine.token !== Token.Mine) {
    return false; // Cell is empty or piece is not a mine.
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = cells[adjIndex];
    if (adj && adj.player !== mine.player) {
      return true; // Mine is adjacent to an enemy piece.
      // TODO: are mines triggered by enemy blockers?
    }
  }
  return false;
};

/** Check if a piece can explode a friendly piece. */
export const canExplodeFriendly = (
  cells: Array<Cell>,
  index: number
): boolean => {
  const mine = cells[index];
  if (!mine || !canExplodeEnemy(cells, index)) {
    return false; // Cell is empty or piece cannot explode.
  }
  for (const adjIndex of adjacentTo(index)) {
    const adj = cells[adjIndex];
    if (adj && adj.player === mine.player && EXPLODABLE.has(adj.token)) {
      return true; // Mine is adjacent to an explodable friendly piece.
    }
  }
  return false;
};

/** Check if a piece or any friendly pieces are in danger. */
export const inDanger = (cells: Array<Cell>, index: number): boolean => {
  const piece = cells[index];
  if (piece && piece.token === Token.Mine) {
    // Mines are allowed to explode themselves, but not friendly pieces.
    return canExplodeFriendly(cells, index);
  } else {
    return (
      canBeShot(cells, index) ||
      canBeInfiltrated(cells, index) ||
      canBeExploded(cells, index)
    );
  }
};
