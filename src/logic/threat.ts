import {
  GRID_HEIGHT,
  GRID_WIDTH,
  adjacentTo,
  coordsToIndex,
  diagonallyAdjacentTo,
  indexToCoords,
  orthogonallyAdjacentTo,
} from "./grid";
import { Piece, Player, Token } from ".";

/** Check if an index can be shot from below. */
export const canBeShotFromBelow = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean => {
  const { x, y: targetY } = indexToCoords(index);
  for (let y = targetY + 1; y < GRID_HEIGHT; y++) {
    const p = pieces.get(coordsToIndex({ x, y }));
    if (!p) {
      continue;
    } else if (p.player !== player && p.token === Token.UpTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (p.player === player && p.token === Token.Blocker) {
      return false; // Index is protected by a blocker.
    }
  }
  return false;
};

/** Check if an index can be shot from above. */
export const canBeShotFromAbove = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean => {
  const { x, y: targetY } = indexToCoords(index);
  for (let y = targetY - 1; y >= 0; y--) {
    const p = pieces.get(coordsToIndex({ x, y }));
    if (!p) {
      continue;
    } else if (p.player !== player && p.token === Token.DownTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (p.player === player && p.token === Token.Blocker) {
      return false; // Index is protected by a blocker.
    }
  }
  return false;
};

/** Check if an index can be shot from the right. */
export const canBeShotFromRight = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean => {
  const { x: targetX, y } = indexToCoords(index);
  for (let x = targetX + 1; x < GRID_WIDTH; x++) {
    const p = pieces.get(coordsToIndex({ x, y }));
    if (!p) {
      continue;
    } else if (p.player !== player && p.token === Token.LeftTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (p.player === player && p.token === Token.Blocker) {
      return false; // Index is protected by a blocker.
    }
  }
  return false;
};

/** Check if an index can be shot from the left. */
export const canBeShotFromLeft = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean => {
  const { x: targetX, y } = indexToCoords(index);
  for (let x = targetX - 1; x >= 0; x--) {
    const p = pieces.get(coordsToIndex({ x, y }));
    if (!p) {
      continue;
    } else if (p.player !== player && p.token === Token.RightTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (p.player === player && p.token === Token.Blocker) {
      return false; // Index is protected by a blocker.
    }
  }
  return false;
};

/** Check if an index can be shot. */
export const canBeShot = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean =>
  canBeShotFromBelow(pieces, player, index) ||
  canBeShotFromAbove(pieces, player, index) ||
  canBeShotFromRight(pieces, player, index) ||
  canBeShotFromLeft(pieces, player, index);

/** Check if an index can be infiltrated. */
export const canBeInfiltrated = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean => {
  for (const adjIndex of orthogonallyAdjacentTo(index)) {
    const p = pieces.get(adjIndex);
    if (p && p.player !== player && p.token === Token.OrthogonalInfiltrator) {
      return true;
    }
  }
  for (const adjIndex of diagonallyAdjacentTo(index)) {
    const p = pieces.get(adjIndex);
    if (p && p.player !== player && p.token === Token.DiagonalInfiltrator) {
      return true;
    }
  }
  return false;
};

/** Check if an index can be exploded. */
export const canBeExploded = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean => {
  for (const adjIndex of adjacentTo(index)) {
    const p = pieces.get(adjIndex);
    if (p && p.player !== player && p.token === Token.Mine) {
      return true;
    }
  }
  return false;
};

/** Check if an index can explode an ally. */
export const canExplodeAlly = (
  pieces: Map<number, Piece>,
  player: Player,
  index: number
): boolean => {
  let hasAlly = false;
  let hasTrigger = false;
  for (const adjIndex of adjacentTo(index)) {
    const p = pieces.get(adjIndex);
    hasAlly = hasAlly || (!!p && p.player === player && p.token !== Token.Mine);
    hasTrigger = hasTrigger || (!!p && p.player !== player); // TODO: what triggers a mine?
  }
  return hasAlly && hasTrigger;
};

/** Check if a piece is threatened. */
export const isThreatened = (
  pieces: Map<number, Piece>,
  { token, player }: Piece,
  index: number
): boolean => {
  switch (token) {
    case Token.Blocker:
      return canBeInfiltrated(pieces, player, index);
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return (
        canBeShot(pieces, player, index) ||
        canBeInfiltrated(pieces, player, index) ||
        canBeExploded(pieces, player, index)
      );
    case Token.OrthogonalInfiltrator:
    case Token.DiagonalInfiltrator:
      return (
        canBeShot(pieces, player, index) || canBeExploded(pieces, player, index)
      );
    case Token.Mine:
      return canExplodeAlly(pieces, player, index);
    case Token.Base:
      return (
        canBeShot(pieces, player, index) || canBeExploded(pieces, player, index)
      ); // TODO: can bases be infiltrated?
  }
};
