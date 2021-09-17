import { deepCopy } from "../../utils/deepCopy";
import { adjacentTo, baseIndexOf, GRID_WIDTH } from "../grid";
import { opponentOf, Player } from "../player";
import { GameState, initialState } from "../state";
import { Token } from "../token";
import { canMoveToken, moveToken, possibleMovements } from "./move";

test("movement fails when source index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(moveToken(state, Player.One, -1, 0)).toBeNull();
});

test("movement fails when destination index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(moveToken(state, Player.One, 0, -1)).toBeNull();
});

test("movement fails when source index is empty", () => {
  const state: GameState = deepCopy(initialState);
  const srcIndex = 0;
  expect(state.grid[srcIndex]).toBeNull();
  expect(moveToken(state, Player.One, srcIndex, 1)).toBeNull();
});

test("movement fails when player does not own token at source index", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const srcIndex = 0;
  const destIndex = srcIndex + 1;
  state.grid[srcIndex] = { owner: opponentOf(player), token: Token.Blocker };
  expect(moveToken(state, player, srcIndex, destIndex)).toBeNull();
});

test("movement fails when destination index is occupied", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const srcIndex = 0;
  const destIndex = srcIndex + 1;
  state.grid[srcIndex] = { owner: player, token: Token.Blocker };
  state.grid[destIndex] = { owner: player, token: Token.Blocker };
  expect(moveToken(state, player, srcIndex, destIndex)).toBeNull();
});

test("movement fails when destination index is not reachable", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const srcIndex = 0;
  const destIndex = srcIndex + 2;
  state.grid[srcIndex] = { owner: player, token: Token.Blocker };
  expect(moveToken(state, player, srcIndex, destIndex)).toBeNull();
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
  const player = Player.One;
  const srcIndex = 0;
  const destIndex = srcIndex + 1;
  for (const token of tokens) {
    const state: GameState = deepCopy(initialState);
    state.grid[srcIndex] = { owner: player, token };
    const expected: GameState = deepCopy(initialState);
    expected.grid[destIndex] = state.grid[srcIndex];
    expect(moveToken(state, player, srcIndex, destIndex)).toStrictEqual(
      expected
    );
  }
});

test("move tokens diagonally", () => {
  const tokens = [Token.Blocker, Token.DiagonalInfiltrator, Token.Mine];
  const player = Player.One;
  const srcIndex = 0;
  const destIndex = srcIndex + 1 + GRID_WIDTH;
  for (const token of tokens) {
    const state: GameState = deepCopy(initialState);
    state.grid[srcIndex] = { owner: player, token };
    const expected: GameState = deepCopy(initialState);
    expected.grid[destIndex] = state.grid[srcIndex];
    expect(moveToken(state, player, srcIndex, destIndex)).toStrictEqual(
      expected
    );
  }
});

test("move mine two spaces", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const srcIndex = 0;
  const destIndex = srcIndex + 2;
  state.grid[srcIndex] = { owner: player, token: Token.Mine };
  const expected: GameState = deepCopy(initialState);
  expected.grid[destIndex] = state.grid[srcIndex];
  expect(moveToken(state, player, srcIndex, destIndex)).toStrictEqual(expected);
});

test("can move token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const srcIndex = 0;
  const destIndex = srcIndex + 1;
  state.grid[srcIndex] = { owner: player, token: Token.Blocker };
  expect(canMoveToken(state, player, srcIndex, destIndex)).toBeTruthy();
});

test("cannot move token", () => {
  const state: GameState = deepCopy(initialState);
  expect(canMoveToken(state, Player.One, -1, -1)).toBeFalsy();
});

test("no possible movements when source index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(possibleMovements(state, Player.One, -1).size).toBe(0);
});

test("no possible movements when source index is empty", () => {
  const state: GameState = deepCopy(initialState);
  const srcIndex = 0;
  expect(state.grid[srcIndex]).toBeNull();
  expect(possibleMovements(state, Player.One, srcIndex).size).toBe(0);
});

test("base can move to all adjacent indices", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const srcIndex = baseIndexOf(player);
  expect(possibleMovements(state, player, srcIndex)).toStrictEqual(
    adjacentTo(srcIndex)
  );
});
