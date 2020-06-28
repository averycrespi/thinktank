import { Player } from "./player";
import { Token } from "./token";

export interface Piece {
  token: Token;
  player: Player;
}
