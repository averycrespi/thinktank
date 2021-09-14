import { deepCopy } from "../../utils/deepCopy";
import { GRID_HEIGHT, GRID_WIDTH, isInGrid } from "../grid";
import { Player } from "../player";
import { advanceState, GameState } from "../state";
import { HeldToken, PlacedToken, toHeld, Token } from "../token";

/**
 * Check if a rotation is legal.
 *
 * Does NOT validate that the rotation is safe.
 */
const isLegalRotation = (
  grid: Array<PlacedToken | null>,
  player: Player,
  afterToken: Token,
  index: number
) => {
  if (!isInGrid(index)) {
    return false; // Out of bounds.
  }
  const src = grid[index];
  if (!src) {
    return false; // Cannot rotate an empty space.
  } else if (src.owner !== player) {
    return false; // Cannot rotate an opponent's token.
  } else if (toHeld(src.token) !== HeldToken.Tank) {
    return false; // The original token must be a tank.
  } else if (toHeld(afterToken) !== HeldToken.Tank) {
    return false; // The replacement token must be a tank.
  } else if (src.token === afterToken) {
    return false; // Cannot rotate a tank to itself.
  } else {
    return true;
  }
};

/** Rotate a token at an index into afterToken, returning an updated game state iff the rotation is valid. */
export const rotateToken = (
  state: GameState,
  player: Player,
  afterToken: Token,
  index: number
): GameState | null => {
  if (!isLegalRotation(state.grid, player, afterToken, index)) {
    return null;
  }
  const newState = deepCopy(state);
  newState.grid[index] = { owner: player, token: afterToken };
  return advanceState(newState, player);
};

/** Check if a token at an index can be rotated into afterToken. */
export const canRotateToken = (
  state: GameState,
  player: Player,
  afterToken: Token,
  index: number
): boolean => rotateToken(state, player, afterToken, index) !== null;

/** Find the indices of all possible tokens that could be rotated into afterToken. */
export const possibleRotations = (
  state: GameState,
  player: Player,
  afterToken: Token
): Set<number> => {
  const rotations = new Set<number>();
  if (toHeld(afterToken) !== HeldToken.Tank) {
    return rotations; // Optimization: The replacement token must be a tank.
  }
  for (let index = 0; index < GRID_WIDTH * GRID_HEIGHT; index++) {
    if (canRotateToken(state, player, afterToken, index)) {
      rotations.add(index);
    }
  }
  return rotations;
};
