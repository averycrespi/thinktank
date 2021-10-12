import { deepCopy } from "../utils/deepCopy";
import { canBeCaptured } from "./danger/capture";
import { canBeExploded, canExplodeDueToProximity } from "./danger/explode";
import { canBeShot } from "./danger/shoot";
import { GRID_SIZE } from "./grid";
import { opponentOf, Player } from "./player";
import { GameState } from "./state";
import { toHeld, Token } from "./token";

/**
 * Advance the game state after a player takes an action.
 *
 * This is an internal method that should not be directly called by a user of the API.
 *
 * Returns the updated game state, or null iff the self-preservation rule is violated.
 */
export const advanceState = (
  state: Readonly<GameState>,
  player: Player
): GameState | null => {
  const newState: GameState = deepCopy(state);

  // First pass: capture tokens.
  for (let index = 0; index < GRID_SIZE; index++) {
    const target = newState.grid[index];
    if (target && canBeCaptured(newState.grid, index)) {
      if (target.owner === player) {
        return null; // Self-preservation rule: cannot cause own token to be captured.
      }
      target.owner = opponentOf(target.owner);
    }
  }

  // Second pass: mark shot and exploding tokens.
  const shot = new Set<number>();
  const exploding = new Set<number>();
  for (let index = 0; index < GRID_SIZE; index++) {
    const target = newState.grid[index];
    if (target && canBeShot(newState.grid, index)) {
      if (target.token !== Token.Mine && target.owner === player) {
        return null; // Self-preservation rule: cannot cause own (non-mine) token to be shot.
      }
      if (target.token === Token.Mine) {
        exploding.add(index); // Mines explode when shot.
      }
      shot.add(index);
    }
    if (target && canExplodeDueToProximity(newState.grid, index)) {
      exploding.add(index);
    }
  }

  // This pass: mark exploded tokens.
  const exploded = new Set<number>();
  for (let index = 0; index < GRID_SIZE; index++) {
    const target = newState.grid[index];
    if (target && canBeExploded(newState.grid, exploding, index)) {
      if (target.token !== Token.Mine && target.owner === player) {
        return null; // Self-preservation rule: cannot cause own (non-mine) token to be exploded.
      }
      exploded.add(index);
    }
  }

  // Fourth pass: return destroyed tokens to the hand of their owner.
  const destroyed = new Set([...shot, ...exploding, ...exploded]);
  for (const index of destroyed) {
    const target = newState.grid[index]!; // We know the cell is non-empty.
    newState.hands[target.owner].push(toHeld(target.token));
    newState.grid[index] = null;
  }

  return newState;
};
