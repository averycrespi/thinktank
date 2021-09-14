import { Player } from "../logic/player";

/** Return the CSS color class of a player. */
export const colorOf = (player: Player): string => {
  switch (player) {
    case Player.One:
      return "red";
    case Player.Two:
      return "blue";
  }
};
