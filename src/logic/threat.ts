import { Piece, Player, Token } from ".";
import {
  adjacentTo,
  orthogonallyAdjacentTo,
  diagonallyAdjacentTo,
  indexToCoords,
  coordsToIndex,
  GRID_HEIGHT,
  GRID_WIDTH,
} from "./grid";

/** Check if the opponent can shoot an index from below. */
export const canShootFromBelow = (
  pieces: Array<Piece>,
  player: Player,
  opponent: Player,
  index: number
): boolean => {
  const { x, y: srcY } = indexToCoords(index);
  for (let y = srcY + 1; y < GRID_HEIGHT; y++) {
    const piece = pieces[coordsToIndex({ x, y })];
    if (!piece) {
      continue;
    } else if (piece.player === opponent && piece.token === Token.UpTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (piece.player === player && piece.token === Token.Blocker) {
      return false; // Piece is protected by a blocker.
    }
  }
  return false;
};

/** Check if the opponent can shoot an index from above. */
export const canShootFromAbove = (
  pieces: Array<Piece>,
  player: Player,
  opponent: Player,
  index: number
): boolean => {
  const { x, y: srcY } = indexToCoords(index);
  for (let y = srcY - 1; y >= 0; y--) {
    const piece = pieces[coordsToIndex({ x, y })];
    if (!piece) {
      continue;
    } else if (piece.player === opponent && piece.token === Token.DownTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (piece.player === player && piece.token === Token.Blocker) {
      return false; // Piece is protected by a blocker.
    }
  }
  return false;
};

/** Check if the opponent can shoot an index from the right. */
export const canShootFromRight = (
  pieces: Array<Piece>,
  player: Player,
  opponent: Player,
  index: number
): boolean => {
  const { x: srcX, y } = indexToCoords(index);
  for (let x = srcX + 1; x < GRID_WIDTH; x++) {
    const piece = pieces[coordsToIndex({ x, y })];
    if (!piece) {
      continue;
    } else if (piece.player === opponent && piece.token === Token.LeftTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (piece.player === player && piece.token === Token.Blocker) {
      return false; // Piece is protected by a blocker.
    }
  }
  return false;
};

/** Check if the opponent can shoot an index from the left. */
export const canShootFromLeft = (
  pieces: Array<Piece>,
  player: Player,
  opponent: Player,
  index: number
): boolean => {
  const { x: srcX, y } = indexToCoords(index);
  for (let x = srcX - 1; x >= 0; x--) {
    const piece = pieces[coordsToIndex({ x, y })];
    if (!piece) {
      continue;
    } else if (piece.player === opponent && piece.token === Token.RightTank) {
      return true; // Opponent's tank has a line of fire.
    } else if (piece.player === player && piece.token === Token.Blocker) {
      return false; // Piece is protected by a blocker.
    }
  }
  return false;
};

/** Check if the opponent can shoot an index. */
export const canShoot = (
  pieces: Array<Piece>,
  player: Player,
  opponent: Player,
  index: number
): boolean =>
  canShootFromBelow(pieces, player, opponent, index) ||
  canShootFromAbove(pieces, player, opponent, index) ||
  canShootFromRight(pieces, player, opponent, index) ||
  canShootFromLeft(pieces, player, opponent, index);

/** Check if the opponent can infiltrate an index. */
export const canInfiltrate = (
  pieces: Array<Piece>,
  opponent: Player,
  index: number
): boolean => {
  for (const adj of orthogonallyAdjacentTo(index)) {
    if (
      pieces[adj] &&
      pieces[adj].player === opponent &&
      pieces[adj].token === Token.OrthogonalInfiltrator
    ) {
      return true;
    }
  }
  for (const adj of diagonallyAdjacentTo(index)) {
    if (
      pieces[adj] &&
      pieces[adj].player === opponent &&
      pieces[adj].token === Token.DiagonalInfiltrator
    ) {
      return true;
    }
  }
  return false;
};

/** Check if the opponent can explode an index. */
export const canExplode = (
  pieces: Array<Piece>,
  opponent: Player,
  index: number
): boolean => {
  for (const adj of adjacentTo(index)) {
    if (
      pieces[adj] &&
      pieces[adj].player === opponent &&
      pieces[adj].token === Token.Mine
    ) {
      return true;
    }
  }
  return false;
};

/** Check if a piece is threatened. */
export const isThreatened = (
  pieces: Array<Piece>,
  player: Player,
  token: Token,
  index: number
): boolean => {
  const opponent = player === Player.Red ? Player.Blue : Player.Red;
  switch (token) {
    case Token.Blocker:
      return canInfiltrate(pieces, opponent, index);
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return (
        canShoot(pieces, player, opponent, index) ||
        canInfiltrate(pieces, opponent, index) ||
        canExplode(pieces, opponent, index)
      );
    case Token.OrthogonalInfiltrator:
    case Token.DiagonalInfiltrator:
      return (
        canShoot(pieces, player, opponent, index) ||
        canExplode(pieces, opponent, index)
      );
    case Token.Mine:
      return false; // TODO: prevent exploding allies
    case Token.Base:
      return (
        canShoot(pieces, player, opponent, index) ||
        canExplode(pieces, opponent, index)
      );
  }
};
