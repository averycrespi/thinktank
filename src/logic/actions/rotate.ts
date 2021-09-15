import { deepCopy } from "../../utils/deepCopy";
import { advanceState } from "../advance";
import { GRID_SIZE, isInGrid } from "../grid";
import { Player } from "../player";
import { GameState } from "../state";
import { isTank, PlacedToken, Token } from "../token";

/**
 * A rotation is considered legal iff:
 * - The index contains a tank that is owned by the player
 * - The replacement token is a tank and is different than the original token
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
  } else if (!isTank(src.token) || !isTank(afterToken)) {
    return false; // The original and replacment tokens must be tanks.
  } else if (src.token === afterToken) {
    return false; // The original and replacement tokens must be different.
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
  const newState: GameState = deepCopy(state);
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
  if (!isTank(afterToken)) {
    return new Set(); // Optimization: The replacement token must be a tank.
  }
  const allIndices = [...Array(GRID_SIZE).keys()];
  return new Set(
    allIndices.filter((index) =>
      canRotateToken(state, player, afterToken, index)
    )
  );
};
