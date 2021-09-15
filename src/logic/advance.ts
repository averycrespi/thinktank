import { canBeCaptured } from "./danger/capture";
import { canBeExploded, canExplode } from "./danger/explode";
import { canBeShot } from "./danger/shoot";
import { GRID_SIZE } from "./grid";
import { opponentOf, Player } from "./player";
import { GameState } from "./state";
import { toHeld, Token } from "./token";

/**
 * Advance the game state after a player takes an action, mutating the existing state in the process.
 *
 * Returns the updated game state, or null iff the self-preservation rule is violated.
 */
export const advanceState = (
  state: GameState,
  player: Player
): GameState | null => {
  // First pass: capture tokens.
  for (let index = 0; index < GRID_SIZE; index++) {
    const target = state.grid[index];
    if (target && canBeCaptured(state.grid, index)) {
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
    const target = state.grid[index];
    if (target && canBeShot(state.grid, index)) {
      if (target.owner === player) {
        return null; // Self-preservation rule: cannot cause own token to be shot.
      }
      shot.add(index);
    }
    if (target && canExplode(state.grid, index)) {
      exploding.add(index);
    }
  }

  // This pass: mark exploded tokens.
  const exploded = new Set<number>();
  for (let index = 0; index < GRID_SIZE; index++) {
    const target = state.grid[index];
    if (target && canBeExploded(state.grid, exploding, index)) {
      if (target.token !== Token.Mine && target.owner === player) {
        return null; // Self-preservation rule: cannot cause own (non-mine) token to be exploded.
      }
      exploded.add(index);
    }
  }

  // Fourth pass: return destroyed tokens to the hand of their owner.
  const destroyed = new Set([...shot, ...exploding, ...exploded]);
  for (const index of destroyed) {
    const target = state.grid[index];
    if (target) {
      state.hands[target.owner].push(toHeld(target.token));
      state.grid[index] = null;
    }
  }

  return state;
};
