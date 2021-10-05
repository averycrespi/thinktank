import { Player } from "../logic/player";

/** Return the CSS class associated with a player. */
export const classOf = (player: Player): string => {
  switch (player) {
    case Player.One:
      return "player-one";
    case Player.Two:
      return "player-two";
  }
};
