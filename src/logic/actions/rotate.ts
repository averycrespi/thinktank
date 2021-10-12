import { deepCopy } from "../../utils/deepCopy";
import { filter } from "../../utils/setOps";
import { advanceState } from "../advance";
import { GRID_SIZE, isInGrid } from "../grid";
import { Player } from "../player";
import { GameState } from "../state";
import { isTank, Token } from "../token";

/**
 * Rotate a token at an index into afterToken, returning an updated game state iff the rotation is legal.
 *
 * A rotation is considered legal iff:
 * - The index contains a tank that is owned by the player
 * - The replacement token is a tank and is different than the original token
 * - The rotation does not cause the self-preservation rule to be violated
 */
export const rotateToken = (
  state: Readonly<GameState>,
  player: Player,
  afterToken: Token,
  index: number
): GameState | null => {
  if (!isInGrid(index)) {
    return null; // Out of bounds.
  }
  const src = state.grid[index];
  if (!src) {
    return null; // Cannot rotate an empty space.
  } else if (src.owner !== player) {
    return null; // Cannot rotate an opponent's token.
  } else if (!isTank(src.token) || !isTank(afterToken)) {
    return null; // The original and replacment tokens must be tanks.
  } else if (src.token === afterToken) {
    return null; // The original and replacement tokens must be different.
  }
  const newState: GameState = deepCopy(state);
  newState.grid[index] = { owner: player, token: afterToken };
  return advanceState(newState, player);
};

/** Check if a token at an index can be rotated into afterToken. */
export const canRotateToken = (
  state: Readonly<GameState>,
  player: Player,
  afterToken: Token,
  index: number
): boolean => rotateToken(state, player, afterToken, index) !== null;

/** Find the indices of all possible tokens that could be rotated into afterToken. */
export const possibleRotationsInto = (
  state: Readonly<GameState>,
  player: Player,
  afterToken: Token
): Set<number> => {
  if (!isTank(afterToken)) {
    return new Set(); // Optimization: The replacement token must be a tank.
  }
  const allIndices = new Set(Array(GRID_SIZE).keys());
  return filter(allIndices, (i) =>
    canRotateToken(state, player, afterToken, i)
  );
};
