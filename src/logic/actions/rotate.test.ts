import { deepCopy } from "../../utils/deepCopy";
import { opponentOf, Player } from "../player";
import { GameState, initialState } from "../state";
import { Token } from "../token";
import { canRotateToken, possibleRotationsInto, rotateToken } from "./rotate";

test("rotation fails when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(rotateToken(state, Player.One, Token.UpTank, -1)).toBeNull();
});

test("rotation fails when index is empty", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  expect(state.grid[index]).toBeNull();
  expect(rotateToken(state, Player.One, Token.UpTank, index)).toBeNull();
});

test("rotation fails when player does not own token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: opponentOf(player), token: Token.DownTank };
  expect(rotateToken(state, player, Token.UpTank, index)).toBeNull();
});

test("rotation fails when original token is not a tank", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Blocker };
  expect(rotateToken(state, player, Token.UpTank, index)).toBeNull();
});

test("rotation fails when replacement token is not a tank", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.UpTank };
  expect(rotateToken(state, player, Token.Blocker, index)).toBeNull();
});

test("rotation fails original token is same as replacement token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const token = Token.UpTank;
  const index = 0;
  state.grid[index] = { owner: player, token };
  expect(rotateToken(state, player, token, index)).toBeNull();
});

test("rotate tank", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const afterToken = Token.UpTank;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.DownTank };
  const expected: GameState = deepCopy(initialState);
  expected.grid[index] = { owner: player, token: afterToken };
  expect(rotateToken(state, player, afterToken, index)).toStrictEqual(expected);
});

test("can rotate token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.DownTank };
  expect(canRotateToken(state, player, Token.UpTank, index)).toBeTruthy();
});

test("cannot rotate token", () => {
  const state: GameState = deepCopy(initialState);
  expect(canRotateToken(state, Player.One, Token.UpTank, 0)).toBeFalsy();
});

test("no possible rotations when replacement token is not a tank", () => {
  const state: GameState = deepCopy(initialState);
  expect(possibleRotationsInto(state, Player.One, Token.Blocker).size).toBe(0);
});

test("all upwards tanks can be rotated into downwards tanks", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const tankIndices = new Set([0, 1, 2]);
  tankIndices.forEach(
    (i) => (state.grid[i] = { owner: player, token: Token.UpTank })
  );
  expect(possibleRotationsInto(state, player, Token.DownTank)).toStrictEqual(
    tankIndices
  );
});
