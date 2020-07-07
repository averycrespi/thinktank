import { Player } from "../logic";

/** Return the CSS color class of a player. */
export const colorOf = (player: Player): string => {
  switch (player) {
    case Player.Red:
      return "red";
    case Player.Blue:
      return "blue";
  }
};
