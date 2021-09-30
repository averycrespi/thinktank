import { Player } from "../player";
import { GameState } from "../state";
import { Token } from "../token";
import { moveToken } from "./move";
import { placeToken } from "./place";
import { rotateToken } from "./rotate";

/** Represents the action of placing a token at an index. */
export interface PlaceAction {
  kind: "place";
  token: Token;
  index: number;
}

/** Represents the action of rotating a token at an index. */
export interface RotateAction {
  kind: "rotate";
  afterToken: Token;
  index: number;
}

/** Represents the action of moving a token from a source index to a destination index. */
export interface MoveAction {
  kind: "move";
  srcIndex: number;
  destIndex: number;
}

/** Represents an action. */
export type Action = PlaceAction | RotateAction | MoveAction;

/** Apply an action to the game state. */
export const applyAction = (
  state: GameState,
  player: Player,
  action: Action
): GameState | null => {
  switch (action.kind) {
    case "place":
      return placeToken(state, player, action.token, action.index);
    case "rotate":
      return rotateToken(state, player, action.afterToken, action.index);
    case "move":
      return moveToken(state, player, action.srcIndex, action.destIndex);
  }
};
