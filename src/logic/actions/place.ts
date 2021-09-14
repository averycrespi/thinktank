import { deepCopy } from "../../utils/deepCopy";
import { GRID_HEIGHT, GRID_WIDTH, isInGrid, isInSpawnOf } from "../grid";
import { Player } from "../player";
import { advanceState, GameState } from "../state";
import { HeldToken, PlacedToken, toHeld, Token } from "../token";

/**
 * Check if a placement is legal.
 *
 * Does NOT validate that the token placement is safe.
 */
const isLegalPlacement = (
  grid: Array<PlacedToken | null>,
  hand: Array<HeldToken>,
  player: Player,
  token: Token,
  index: number
): boolean => {
  if (!hand.includes(toHeld(token))) {
    return false; // Token must be in hand.
  } else if (!isInGrid(index)) {
    return false; // Out of bounds.
  } else if (grid[index]) {
    return false; // Cannot place a token on top of another piece.
  } else if (!isInSpawnOf(player, index)) {
    return false; // Cannot place a token outside of spawn.
  } else {
    return true;
  }
};

/** Place a token at an index, returning an updated game state iff the placement is valid. */
export const placeToken = (
  state: GameState,
  player: Player,
  token: Token,
  index: number
): GameState | null => {
  if (
    !isLegalPlacement(state.grid, state.hands[player], player, token, index)
  ) {
    return null;
  }
  const newState = deepCopy(state);
  const handIndex = newState.hands[player].indexOf(toHeld(token));
  newState.hands[player].splice(handIndex, 1); // Remove from hand.
  newState.grid[index] = { owner: player, token };
  return advanceState(newState, player);
};

/** Check if a token can be placed at an index. */
export const canPlaceToken = (
  state: GameState,
  player: Player,
  token: Token,
  index: number
): boolean => placeToken(state, player, token, index) !== null;

/** Find all indices that a token could be placed at. */
export const possiblePlacements = (
  state: GameState,
  player: Player,
  token: Token
): Set<number> => {
  const placements = new Set<number>();
  if (!state.hands[player].includes(toHeld(token))) {
    return placements; // Optimization: Token must be in hand.
  }
  for (let index = 0; index < GRID_WIDTH * GRID_HEIGHT; index++) {
    if (canPlaceToken(state, player, token, index)) {
      placements.add(index);
    }
  }
  return placements;
};
