import { deepCopy } from "../../utils/deepCopy";
import { GRID_WIDTH } from "../grid";
import { opponentOf, Player } from "../player";
import { GameState, initialState } from "../state";
import { Token } from "../token";
import { canBeCaptured } from "./capture";

test("token cannot be captured when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(canBeCaptured(state.grid, -1)).toBeFalsy();
});

test("token cannot be captured when index is empty", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  expect(state.grid[index]).toBeNull();
  expect(canBeCaptured(state.grid, index)).toBeFalsy();
});

test("token cannot be captured when not capturable", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Mine };
  state.grid[index + 1] = {
    owner: opponentOf(player),
    token: Token.CardinalInfiltrator,
  };
  expect(canBeCaptured(state.grid, index)).toBeFalsy();
});

test("token cannot be captured when protected by friendly infiltrator", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Blocker };
  state.grid[index + 1] = {
    owner: opponentOf(player),
    token: Token.CardinalInfiltrator,
  };
  state.grid[index + GRID_WIDTH] = {
    owner: player,
    token: Token.CardinalInfiltrator,
  };
  expect(canBeCaptured(state.grid, index)).toBeFalsy();
});

test("token can be captured when adjacent to enemy infiltrator", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Blocker };

  const infIndices = [index + 1, index + GRID_WIDTH, index + GRID_WIDTH + 1];
  const infTokens = [Token.CardinalInfiltrator, Token.DiagonalInfiltrator];
  for (const infIndex of infIndices) {
    for (const infToken of infTokens) {
      const newState: GameState = deepCopy(state);
      newState.grid[infIndex] = { owner: opponentOf(player), token: infToken };
      expect(canBeCaptured(newState.grid, index)).toBeTruthy();
    }
  }
});

test("token cannot be captured when not adjacent to enemy infiltrator", () => {
  const state: GameState = deepCopy(initialState);
  const index = 0;
  state.grid[index] = { owner: Player.One, token: Token.Blocker };
  expect(canBeCaptured(state.grid, index)).toBeFalsy();
});
