import { Ctx, Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { moveToken } from "./actions/move";
import { placeToken } from "./actions/place";
import { rotateToken } from "./actions/rotate";
import { Player } from "./player";
import { GameState, initialState } from "./state";
import { Token } from "./token";

const setup = (): GameState => initialState;

const place = (G: GameState, ctx: Ctx, token: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  const newState = placeToken(G, player, token, index);
  return newState ? newState : INVALID_MOVE;
};

const move = (G: GameState, ctx: Ctx, srcIndex: number, destIndex: number) => {
  const player = ctx.currentPlayer as Player;
  const newState = moveToken(G, player, srcIndex, destIndex);
  return newState ? newState : INVALID_MOVE;
};

const rotate = (G: GameState, ctx: Ctx, afterToken: Token, index: number) => {
  const player = ctx.currentPlayer as Player;
  const newState = rotateToken(G, player, afterToken, index);
  return newState ? newState : INVALID_MOVE;
};

const endIf = (G: GameState, ctx: Ctx): boolean => G.winner !== null;

/** Represents a game. */
export const game: Game<GameState, Ctx> = {
  name: "thinktank",
  setup: setup,
  moves: { place, move, rotate },
  turn: { moveLimit: 1 },
  endIf: endIf,
};
