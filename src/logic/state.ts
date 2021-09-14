import { deepCopy } from "../utils/deepCopy";
import { canBeCaptured } from "./danger/capture";
import { canBeExploded, canExplode } from "./danger/explode";
import { canBeShot } from "./danger/shoot";
import { Event } from "./event";
import { baseIndexOf, GRID_HEIGHT, GRID_WIDTH } from "./grid";
import { opponentOf, Player } from "./player";
import { HeldToken, PlacedToken, toHeld, Token } from "./token";

/**
 * Represents the current state of a game.
 *
 * Turn information is stored within the ctx object, so it doesn't need to be in the game state.
 *
 * The state must be JSON serializable for boardgame.io to work properly.
 */
export interface GameState {
  events: Array<Event>;
  winner: Player | null;
  grid: Array<PlacedToken | null>;
  hands: {
    [Player.One]: Array<HeldToken>;
    [Player.Two]: Array<HeldToken>;
  };
}

/** The initial state of the grid. */
const initialGrid = (): Array<PlacedToken | null> => {
  let grid = Array(GRID_WIDTH * GRID_HEIGHT).fill(null);
  grid[baseIndexOf(Player.One)] = { owner: Player.One, token: Token.Base };
  grid[baseIndexOf(Player.Two)] = { owner: Player.Two, token: Token.Base };
  return grid;
};

/** The initial state of a player's hand. */
const initialHand: Array<HeldToken> = [
  ...Array(3).fill(HeldToken.Blocker),
  ...Array(5).fill(HeldToken.Tank),
  ...Array(2).fill(HeldToken.CardinalInfiltrator),
  ...Array(2).fill(HeldToken.DiagonalInfiltrator),
  ...Array(1).fill(HeldToken.Mine),
];

/** The initial state of a game. */
export const initialState: GameState = {
  events: [],
  winner: null,
  grid: initialGrid(),
  hands: {
    [Player.One]: initialHand,
    [Player.Two]: initialHand,
  },
};

/**
 * Advance the game state after a player takes an action, mutating the existing state in the process.
 *
 * Returns the updated game state, or null iff the no-sacrifice rule is violated.
 */
export const advanceState = (
  state: GameState,
  player: Player
): GameState | null => {
  // First pass: capture tokens.
  for (let index = 0; index < GRID_WIDTH * GRID_HEIGHT; index++) {
    const target = state.grid[index];
    if (target && canBeCaptured(state.grid, index)) {
      if (target.owner === player) {
        return null; // Cannot cause own token to be captured.
      }
      const capturer = opponentOf(target.owner);
      state.events.push({
        kind: "capture",
        capturer,
        capturedToken: deepCopy(target),
        index,
      });
      target.owner = capturer; // Update target's owner.
    }
  }

  // Second pass: mark shot and exploded tokens as destroyed.
  const destroyed = new Set<number>();
  for (let index = 0; index < GRID_WIDTH * GRID_HEIGHT; index++) {
    const target = state.grid[index];
    if (target && canBeShot(state.grid, index)) {
      if (target.owner === player) {
        return null; // Cannot cause own token to be shot.
      }
      state.events.push({
        kind: "shoot",
        shooter: opponentOf(target.owner),
        shotToken: deepCopy(target),
        index,
      });
      destroyed.add(index);
    } else if (target && canExplode(state.grid, index)) {
      state.events.push({
        kind: "explode",
        exploder: target.owner,
        explodedToken: deepCopy(target),
        index,
      });
      destroyed.add(index);
    } else if (target && canBeExploded(state.grid, index)) {
      if (target.owner === player) {
        return null; // Cannot cause own (non-mine) token to be exploded.
      }
      state.events.push({
        kind: "explode",
        exploder: opponentOf(target.owner),
        explodedToken: deepCopy(target),
        index,
      });
      destroyed.add(index);
    }
  }

  // Third pass: return destroyed tokens to the hand of their owner.
  for (const index of destroyed) {
    const target = state.grid[index];
    if (target) {
      state.hands[target.owner].push(toHeld(target.token));
      state.grid[index] = null;
    }
  }

  // Check if either player has won the game.
  for (const player of [Player.One, Player.Two]) {
    if (state.hands[player].includes(HeldToken.Base)) {
      state.winner = opponentOf(player);
    }
  }

  return state;
};
