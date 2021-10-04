import { deepCopy } from "../../utils/deepCopy";
import { GRID_SIZE, isInSpawnOf } from "../grid";
import { Player } from "../player";
import { GameState, initialState } from "../state";
import { HeldToken, Token } from "../token";
import { canPlaceToken, placeToken, possiblePlacementFor } from "./place";

test("placement fails when token is not in hand", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  state.hands[player] = [];
  expect(placeToken(state, player, Token.Blocker, 0)).toBeNull();
});

test("placement fails when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(placeToken(state, Player.One, Token.Blocker, -1)).toBeNull();
});

test("placement fails when index is occupied", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = 0;
  state.grid[index] = { owner: player, token: Token.Blocker };
  expect(placeToken(state, player, Token.Blocker, index)).toBeNull();
});

test("placement fails when token is outside of spawn region", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const nonSpawnIndices = [...Array(GRID_SIZE).keys()].filter(
    (i) => !isInSpawnOf(player, i)
  );
  nonSpawnIndices.forEach((i) => {
    expect(canPlaceToken(state, player, Token.Blocker, i)).toBeFalsy();
  });
});

test("place token in spawn region", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const index = [...Array(GRID_SIZE).keys()].find((i) =>
    isInSpawnOf(player, i)
  )!; // We know at least one such index exists.
  const expected: GameState = deepCopy(initialState);
  expected.grid[index] = { owner: player, token: Token.Blocker };
  const handIndex = expected.hands[player].indexOf(HeldToken.Blocker);
  expected.hands[player].splice(handIndex, 1); // Remove from hand.
  expect(placeToken(state, player, Token.Blocker, index)).toStrictEqual(
    expected
  );
});

test("can place token in all spawn indices", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const spawnIndices = [...Array(GRID_SIZE).keys()].filter((i) =>
    isInSpawnOf(player, i)
  );
  spawnIndices.forEach((i) => {
    expect(canPlaceToken(state, player, Token.Blocker, i)).toBeTruthy();
  });
});

test("cannot place token", () => {
  const state: GameState = deepCopy(initialState);
  expect(canPlaceToken(state, Player.One, Token.Blocker, 0)).toBeFalsy();
});

test("no possible placements when token is not in hand", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  state.hands[player] = [];
  expect(possiblePlacementFor(state, player, Token.Blocker).size).toBe(0);
});

test("all possible placements lie within spawn region", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const placements = possiblePlacementFor(state, player, Token.Blocker);
  placements.forEach((i) => {
    expect(isInSpawnOf(player, i)).toBeTruthy();
  });
});
