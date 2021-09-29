/**
 * Represents a player.
 *
 * Player one moves first, and their home & spawn are in the top-left corner of the grid.
 * Player two moves second, and their home & spawn are in the bottom-right corner of the grid.
 *
 * Boardgame.io requires that the players have values "0" and "1".
 */
export enum Player {
  One = "0",
  Two = "1",
}

export const nameOf = (player: Player): string => {
  switch (player) {
    case Player.One:
      return "Player One";
    case Player.Two:
      return "Player Two";
  }
};

/** Returns the opponent of a player. */
export const opponentOf = (player: Player): Player => {
  switch (player) {
    case Player.One:
      return Player.Two;
    case Player.Two:
      return Player.One;
  }
};
