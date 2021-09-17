import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { deepCopy } from "../utils/deepCopy";
import { endIf, game, move, place, rotate } from "./game";
import { baseIndexOf } from "./grid";
import { opponentOf, Player } from "./player";
import { GameState, initialState } from "./state";
import { Token } from "./token";

const player = Player.One;

// @ts-ignore
const ctx: Ctx = { currentPlayer: player };

test("setup returns initial state", () => {
  expect(game.setup!(ctx)).toStrictEqual(initialState);
});

test("place succeeds", () => {
  expect(
    place(initialState, ctx, Token.Blocker, baseIndexOf(player) + 2)
  ).not.toBe(INVALID_MOVE);
});

test("place fails", () => {
  expect(place(initialState, ctx, Token.Blocker, 0)).toBe(INVALID_MOVE);
});

test("move succeeds", () => {
  const baseIndex = baseIndexOf(player);
  expect(move(initialState, ctx, baseIndex, baseIndex + 1)).not.toBe(
    INVALID_MOVE
  );
});

test("move fails", () => {
  expect(move(initialState, ctx, 0, 2)).toBe(INVALID_MOVE);
});

test("rotate succeeds", () => {
  const newState: GameState = deepCopy(initialState);
  const index = 0;
  newState.grid[index] = { owner: player, token: Token.UpTank };
  expect(rotate(newState, ctx, Token.DownTank, index)).not.toBe(INVALID_MOVE);
});

test("rotate fails", () => {
  expect(rotate(initialState, ctx, Token.UpTank, 0)).toBe(INVALID_MOVE);
});

test("endIf returns winner", () => {
  const newState: GameState = deepCopy(initialState);
  newState.grid[baseIndexOf(player)] = null;
  expect(endIf(newState, ctx)).toBe(opponentOf(player));
});

test("endIf returns null when no winner", () => {
  expect(endIf(initialState, ctx)).toBeNull();
});
