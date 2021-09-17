import { deepCopy } from "../../utils/deepCopy";
import { GRID_WIDTH } from "../grid";
import { opponentOf, Player } from "../player";
import { GameState, initialState } from "../state";
import { Token } from "../token";
import { canBeShot } from "./shoot";

test("token cannot be shot when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(canBeShot(state.grid, -1)).toBeFalsy();
});

test("token cannot be shot when index is empty", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  expect(state.grid[index]).toBeNull();
  expect(canBeShot(state.grid, index)).toBeFalsy();
});

test("token cannot be shot when not shootable", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Blocker };
  state.grid[index + 1] = { owner: opponentOf(player), token: Token.LeftTank };
  expect(canBeShot(state.grid, index)).toBeFalsy();
});

test("token cannot be shot by friendly tank", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = { owner: player, token: Token.LeftTank };
  expect(canBeShot(state.grid, index)).toBeFalsy();
});

test("token cannot be shot when enemy tank is facing away", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = { owner: opponentOf(player), token: Token.UpTank };
  expect(canBeShot(state.grid, index)).toBeFalsy();
});

test("token cannot be shot when protected by friendly blocker", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;

  const fixtures = [
    [2 * GRID_WIDTH, GRID_WIDTH, 0, Token.DownTank], // Shot from above.
    [0, GRID_WIDTH, 2 * GRID_WIDTH, Token.UpTank], // Shot from below.
    [2, 1, 0, Token.RightTank], // Shot from left.
    [0, 1, 2, Token.LeftTank], // Shot from right.
  ];
  for (const [index, blockerIndex, tankIndex, tankToken] of fixtures) {
    const newState: GameState = deepCopy(state);
    newState.grid[index] = { owner: player, token: Token.Mine };
    newState.grid[blockerIndex] = { owner: player, token: Token.Blocker };
    newState.grid[tankIndex] = { owner: opponentOf(player), token: tankToken };
    expect(canBeShot(newState.grid, index)).toBeFalsy();
  }
});

test("token can be shot by enemy tanks", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;

  const fixtures = [
    [GRID_WIDTH, 0, Token.DownTank], // Shot from above.
    [0, GRID_WIDTH, Token.UpTank], // Shot from below.
    [1, 0, Token.RightTank], // Shot from left.
    [0, 1, Token.LeftTank], // Shot from right.
  ];
  for (const [index, tankIndex, tankToken] of fixtures) {
    const newState: GameState = deepCopy(state);
    newState.grid[index] = { owner: player, token: Token.Mine };
    newState.grid[tankIndex] = { owner: opponentOf(player), token: tankToken };
    expect(canBeShot(newState.grid, index)).toBeTruthy();
  }
});

test("token can be shot from enemy tank through friendly token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = { owner: player, token: Token.UpTank };
  state.grid[index + 2] = { owner: opponentOf(player), token: Token.LeftTank };
  expect(canBeShot(state.grid, index)).toBeTruthy();
});

test("token can be shot from enemy tank through enemy blocker", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = { owner: opponentOf(player), token: Token.Blocker };
  state.grid[index + 2] = { owner: opponentOf(player), token: Token.LeftTank };
  expect(canBeShot(state.grid, index)).toBeTruthy();
});
