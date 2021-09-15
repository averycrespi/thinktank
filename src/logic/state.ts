import { baseIndexOf, GRID_SIZE } from "./grid";
import { Player } from "./player";
import { HeldToken, PlacedToken, Token } from "./token";

/**
 * Represents the current state of a game.
 *
 * Turn information is stored within the ctx object, so it doesn't need to be in the game state.
 *
 * The state must be JSON serializable for boardgame.io to work properly.
 */
export interface GameState {
  grid: Array<PlacedToken | null>;
  hands: {
    [Player.One]: Array<HeldToken>;
    [Player.Two]: Array<HeldToken>;
  };
}

/** The initial state of the grid. */
const initialGrid = (): Array<PlacedToken | null> => {
  let grid = Array(GRID_SIZE).fill(null);
  grid[baseIndexOf(Player.One)] = { owner: Player.One, token: Token.Base };
  grid[baseIndexOf(Player.Two)] = { owner: Player.Two, token: Token.Base };
  return grid;
};

/** The initial state of a player's hand. */
const initialHand: Array<HeldToken> = [
  ...Array(3).fill(HeldToken.Blocker),
  ...Array(5).fill(HeldToken.Tank),
  HeldToken.CardinalInfiltrator,
  HeldToken.DiagonalInfiltrator,
  HeldToken.Mine,
];

/** The initial state of a game. */
export const initialState: GameState = {
  grid: initialGrid(),
  hands: {
    [Player.One]: initialHand,
    [Player.Two]: initialHand,
  },
};

/** Returns the winner of the game, or null iff the game is not over. */
export const winnerOf = (state: GameState): Player | null => {
  const bases = state.grid.filter(
    (t) => t && t.token === Token.Base
  ) as Array<PlacedToken>; // TypeScript doesn't recognize the null check, so we need to cast.
  switch (bases.length) {
    case 1:
      return bases[0]!.owner; // The player with the only remaining base wins.
    case 2:
      if (bases[0] && bases[1] && bases[0].owner === bases[1].owner) {
        return bases[0].owner; // The player who owns both bases wins.
      } else {
        return null; // The bases are owned by different players.
      }
    default:
      return null;
  }
};
