import { deepCopy } from "../../utils/deepCopy";
import { Player } from "../player";
import { GameState, initialState } from "../state";
import { Token } from "../token";
import { canRotateToken, possibleRotations, rotateToken } from "./rotate";

test("rotation fails when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(rotateToken(state, Player.One, Token.UpTank, -1)).toBe(null);
});

test("rotation fails when index is empty", () => {
  const state: GameState = deepCopy(initialState);
  expect(state.grid[0]).toBe(null);
  expect(rotateToken(state, Player.One, Token.UpTank, 0)).toBe(null);
});

test("rotation fails when player does not own token", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.Two, token: Token.DownTank };
  expect(rotateToken(state, Player.One, Token.UpTank, 0)).toBe(null);
});

test("rotation fails original or replacement token is not a tank", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.Blocker };
  expect(rotateToken(state, Player.One, Token.UpTank, 0)).toBe(null);
});

test("rotation fails original token is same as replacement token", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.UpTank };
  expect(rotateToken(state, Player.One, Token.UpTank, 0)).toBe(null);
});

test("rotate tank", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.DownTank };
  const expected: GameState = deepCopy(initialState);
  expected.grid[0] = { owner: Player.One, token: Token.UpTank };
  expect(rotateToken(state, Player.One, Token.UpTank, 0)).toStrictEqual(
    expected
  );
});

test("can rotate token", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.DownTank };
  expect(canRotateToken(state, Player.One, Token.UpTank, 0)).toBe(true);
});

test("cannot rotate token", () => {
  const state: GameState = deepCopy(initialState);
  expect(canRotateToken(state, Player.One, Token.UpTank, 0)).toBe(false);
});

test("no possible rotations when replacement token is not a tank", () => {
  const state: GameState = deepCopy(initialState);
  expect(possibleRotations(state, Player.One, Token.Blocker).size).toBe(0);
});

test("upwards tanks can all be rotated into downwards tanks", () => {
  const state: GameState = deepCopy(initialState);
  const tankIndices = new Set([0, 1, 2]);
  tankIndices.forEach(
    (i) => (state.grid[i] = { owner: Player.One, token: Token.UpTank })
  );
  expect(possibleRotations(state, Player.One, Token.DownTank)).toStrictEqual(
    tankIndices
  );
});
