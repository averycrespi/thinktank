import { deepCopy } from "../../utils/deepCopy";
import { filter } from "../../utils/setOps";
import { advanceState } from "../advance";
import { GRID_SIZE, isInGrid, isInSpawnOf } from "../grid";
import { Player } from "../player";
import { GameState } from "../state";
import { toHeld, Token } from "../token";

/**
 * Place a token at an index, returning an updated game state iff the placement is legal.
 *
 * A placement is legal iff:
 * - The player has at least one of the token in their hand
 * - The index does not contain a token
 * - The index lies within the player's spawn region
 * - The placement does not cause the self-preservation rule to be violated
 */
export const placeToken = (
  state: GameState,
  player: Player,
  token: Token,
  index: number
): GameState | null => {
  const hand = state.hands[player];
  if (!hand.includes(toHeld(token))) {
    return null; // Token must be in hand.
  } else if (!isInGrid(index)) {
    return null; // Out of bounds.
  } else if (state.grid[index]) {
    return null; // Cannot place a token in an occupied cell.
  } else if (!isInSpawnOf(player, index)) {
    return null; // Cannot place a token outside of the player's spawn region.
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
export const possiblePlacementFor = (
  state: GameState,
  player: Player,
  token: Token
): Set<number> => {
  if (!state.hands[player].includes(toHeld(token))) {
    return new Set(); // Optimization: Token must be in hand.
  }
  const allIndices = new Set(Array(GRID_SIZE).keys());
  return filter(allIndices, (i) => canPlaceToken(state, player, token, i));
};
