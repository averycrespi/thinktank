import { Ctx, Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { moveToken } from "./actions/move";
import { placeToken } from "./actions/place";
import { rotateToken } from "./actions/rotate";
import { Player } from "./player";
import { GameState, initialState, winnerOf } from "./state";
import { Token } from "./token";

/** Wraps game logic into a boardgame.io game object. */
export const game: Game<GameState, Ctx> = {
  name: "thinktank",
  setup: () => initialState,
  moves: {
    placeToken: (G: GameState, ctx: Ctx, token: Token, index: number) =>
      placeToken(G, ctx.currentPlayer as Player, token, index) ?? INVALID_MOVE,
    moveToken: (G: GameState, ctx: Ctx, srcIndex: number, destIndex: number) =>
      moveToken(G, ctx.currentPlayer as Player, srcIndex, destIndex) ??
      INVALID_MOVE,
    rotateToken: (G: GameState, ctx: Ctx, afterToken: Token, index: number) =>
      rotateToken(G, ctx.currentPlayer as Player, afterToken, index),
  },
  turn: { moveLimit: 1 },
  endIf: (G: GameState, _ctx: Ctx) => winnerOf(G),
};
