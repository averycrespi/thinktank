import { deepCopy } from "../../utils/deepCopy";
import { GRID_WIDTH } from "../grid";
import { opponentOf, Player } from "../player";
import { GameState, initialState } from "../state";
import { Token } from "../token";
import { canBeExploded, canExplode } from "./explode";

test("token cannot explode when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(canExplode(state.grid, -1)).toBeFalsy();
});

test("token cannot explode when index is empty", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  expect(state.grid[index]).toBeNull();
  expect(canExplode(state.grid, index)).toBeFalsy();
});

test("token cannot explode when token is not a mine", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  state.grid[index] = { owner: Player.One, token: Token.Blocker };
  expect(canExplode(state.grid, index)).toBeFalsy();
});

test("token cannot explode when not adjacent to explodable enemy token", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  state.grid[index] = { owner: Player.One, token: Token.Mine };
  expect(canExplode(state.grid, index)).toBeFalsy();
});

test("token cannot explode when adjacent to non-explodable enemy token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = { owner: opponentOf(player), token: Token.Blocker };
  expect(canExplode(state.grid, index)).toBeFalsy();
});

test("token can explode when adjacent to explodable enemy token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = { owner: opponentOf(player), token: Token.UpTank };
  expect(canExplode(state.grid, index)).toBeTruthy();
});

test("token cannot explode when adjacent to explodable friendly token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = { owner: player, token: Token.UpTank };
  expect(canExplode(state.grid, index)).toBeFalsy();
});

test("token cannot be exploded when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(canBeExploded(state.grid, new Set(), -1)).toBeFalsy();
});

test("token cannot be exploded when index is empty", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  expect(state.grid[index]).toBeNull();
  expect(canBeExploded(state.grid, new Set([index + 1]), index)).toBeFalsy();
});

test("token cannot be exploded when not explodable", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Blocker };
  expect(canBeExploded(state.grid, new Set([index + 1]), index)).toBeFalsy();
});

test("token can be exploded when adjacent to exploding mine", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.UpTank };

  const mineIndices = [index + 1, index + GRID_WIDTH, index + GRID_WIDTH + 1];
  for (const mineIndex of mineIndices) {
    const newState: GameState = deepCopy(state);
    newState.grid[mineIndex] = { owner: opponentOf(player), token: Token.Mine };
    expect(
      canBeExploded(newState.grid, new Set([mineIndex]), index)
    ).toBeTruthy();
  }
});
