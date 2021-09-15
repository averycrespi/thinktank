import { Player } from "../logic/player";

/** Returns the name of a player. */
export const nameOf = (player: Player): string => {
  switch (player) {
    case Player.One:
      return "Red";
    case Player.Two:
      return "Blue";
  }
};
