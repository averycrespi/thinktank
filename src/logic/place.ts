import { Cell, Piece, Player, Token } from ".";
import { GRID_SIZE, isBlueSpawn, isRedSpawn } from "./grid";

import { inDanger } from "./danger";

/** Check if a placement is possible. */
export const canPlace = (
  cells: Array<Cell>,
  hand: Array<Token>,
  { player, token }: Piece,
  index: number
): boolean => {
  if (!hand.includes(token)) {
    return false; // Token must be in hand.
  } else if (cells[index]) {
    return false; // Cannot place a piece on top of another piece.
  } else if (player === Player.Red && !isRedSpawn(index)) {
    return false; // Red cannot place a piece outside of red spawn.
  } else if (player === Player.Blue && !isBlueSpawn(index)) {
    return false; // Blue cannot place a piece outside of blue spawn.
  }
  // Simulate the placement and check for consequences.
  const simulated = [...cells];
  simulated[index] = { player, token };
  // We need to check if ANY of the player's pieces are endangered.
  // For example, placing a mine could endanger pieces adjacent to it.
  for (let index = 0; index < simulated.length; index++) {
    const piece = simulated[index];
    if (!piece) {
      continue;
    } else if (piece.player === player && inDanger(simulated, index)) {
      return false; // No-suicide rule: cannot endanger your own piece.
    }
  }
  return true;
};

/** Find all possible placements for a token. */
export const possiblePlacements = (
  cells: Array<Cell>,
  hand: Array<Token>,
  { player, token }: Piece
): Set<number> => {
  // Optimization: check if token is in hand.
  if (!hand.includes(token)) {
    return new Set<number>();
  }
  // Check every cell in the grid.
  let placements = new Set<number>();
  for (let index = 0; index < GRID_SIZE; index++) {
    if (canPlace(cells, hand, { player, token }, index)) {
      placements.add(index);
    }
  }
  return placements;
};
