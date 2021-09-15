import { deepCopy } from "../../utils/deepCopy";
import { adjacentTo, baseIndexOf, GRID_WIDTH } from "../grid";
import { Player } from "../player";
import { GameState, initialState } from "../state";
import { Token } from "../token";
import { canMoveToken, moveToken, possibleMovements } from "./move";

test("movement fails when source index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(moveToken(state, Player.One, -1, 0)).toBe(null);
});

test("movement fails when destination index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(moveToken(state, Player.One, 0, -1)).toBe(null);
});

test("movement fails when source index is empty", () => {
  const state: GameState = deepCopy(initialState);
  expect(state.grid[0]).toBe(null);
  expect(moveToken(state, Player.One, 0, 1)).toBe(null);
});

test("movement fails when player does not own token at source index", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.Two, token: Token.Blocker };
  expect(moveToken(state, Player.One, 0, 1)).toBe(null);
});

test("movement fails when destination index is occupied", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.Blocker };
  state.grid[1] = { owner: Player.One, token: Token.Blocker };
  expect(moveToken(state, Player.One, 0, 1)).toBe(null);
});

test("movement fails when destination index is not reachable", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.Blocker };
  expect(moveToken(state, Player.One, 0, 2)).toBe(null);
});

test("move tokens cardinally", () => {
  const tokens = [
    Token.Blocker,
    Token.UpTank,
    Token.DownTank,
    Token.LeftTank,
    Token.RightTank,
    Token.CardinalInfiltrator,
    Token.Mine,
  ];
  for (const token of tokens) {
    const state: GameState = deepCopy(initialState);
    state.grid[0] = { owner: Player.One, token };
    const expected: GameState = deepCopy(initialState);
    expected.grid[1] = state.grid[0];
    expect(moveToken(state, Player.One, 0, 1)).toStrictEqual(expected);
  }
});

test("move tokens diagonally", () => {
  const tokens = [Token.Blocker, Token.DiagonalInfiltrator, Token.Mine];
  for (const token of tokens) {
    const state: GameState = deepCopy(initialState);
    state.grid[0] = { owner: Player.One, token };
    const expected: GameState = deepCopy(initialState);
    const destIndex = 1 + GRID_WIDTH;
    expected.grid[destIndex] = state.grid[0];
    expect(moveToken(state, Player.One, 0, destIndex)).toStrictEqual(expected);
  }
});

test("move mine two spaces", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.Mine };
  const expected: GameState = deepCopy(initialState);
  expected.grid[2] = state.grid[0];
  expect(moveToken(state, Player.One, 0, 2)).toStrictEqual(expected);
});

test("can move token", () => {
  const state: GameState = deepCopy(initialState);
  const token = { owner: Player.One, token: Token.Blocker };
  state.grid[0] = token;
  expect(canMoveToken(state, Player.One, 0, 1)).toBe(true);
});

test("cannot move token", () => {
  const state: GameState = deepCopy(initialState);
  expect(canMoveToken(state, Player.One, -1, -1)).toBe(false);
});

test("no possible movements when source index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(possibleMovements(state, Player.One, -1).size).toBe(0);
});

test("no possible movements when source index is empty", () => {
  const state: GameState = deepCopy(initialState);
  expect(state.grid[0]).toBe(null);
  expect(possibleMovements(state, Player.One, 0).size).toBe(0);
});

test("base can move to all adjacent indices", () => {
  const state: GameState = deepCopy(initialState);
  const baseIndex = baseIndexOf(Player.One);
  expect(possibleMovements(state, Player.One, baseIndex)).toStrictEqual(
    adjacentTo(baseIndex)
  );
});
