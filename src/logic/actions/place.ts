import { deepCopy } from "../../utils/deepCopy";
import { advanceState } from "../advance";
import { GRID_SIZE, isInGrid, isInSpawnOf } from "../grid";
import { Player } from "../player";
import { GameState } from "../state";
import { HeldToken, PlacedToken, toHeld, Token } from "../token";

/**
 * A placement is considered legal iff:
 * - The player has at least one of the token in their hand
 * - The index does not contain a token
 * - The index lies within the player's spawn region
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
    return false; // Cannot place a token in an occupied cell.
  } else if (!isInSpawnOf(player, index)) {
    return false; // Cannot place a token outside of the spawn region.
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
  const hand = state.hands[player];
  if (!isLegalPlacement(state.grid, hand, player, token, index)) {
    return null;
  }
  const newState: GameState = deepCopy(state);
  const handIndex = hand.indexOf(toHeld(token));
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
  if (!state.hands[player].includes(toHeld(token))) {
    return new Set(); // Optimization: Token must be in hand.
  }
  const allIndices = [...Array(GRID_SIZE).keys()];
  return new Set(
    allIndices.filter((index) => canPlaceToken(state, player, token, index))
  );
};
