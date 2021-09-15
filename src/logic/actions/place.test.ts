import { deepCopy } from "../../utils/deepCopy";
import { GRID_SIZE, isInSpawnOf } from "../grid";
import { Player } from "../player";
import { GameState, initialState } from "../state";
import { HeldToken, Token } from "../token";
import { canPlaceToken, placeToken, possiblePlacements } from "./place";

test("placement fails when token is not in hand", () => {
  const state: GameState = deepCopy(initialState);
  state.hands[Player.One] = [];
  expect(placeToken(state, Player.One, Token.Blocker, 0)).toBe(null);
});

test("placement fails when index is out of bounds", () => {
  const state: GameState = deepCopy(initialState);
  expect(placeToken(state, Player.One, Token.Blocker, -1)).toBe(null);
});

test("placement fails when index is occupied", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[0] = { owner: Player.One, token: Token.Blocker };
  expect(placeToken(state, Player.One, Token.Blocker, 0)).toBe(null);
});

test("placement fails when token is outside of spawn region", () => {
  const state: GameState = deepCopy(initialState);
  expect(placeToken(state, Player.One, Token.Blocker, 0)).toBe(null);
});

test("place token in spawn region", () => {
  const state: GameState = deepCopy(initialState);
  const index = [...Array(GRID_SIZE).keys()].find((i) =>
    isInSpawnOf(Player.One, i)
  )!; // We know at least one such index exists.
  const expected: GameState = deepCopy(initialState);
  expected.grid[index] = { owner: Player.One, token: Token.Blocker };
  const handIndex = expected.hands[Player.One].indexOf(HeldToken.Blocker);
  expected.hands[Player.One].splice(handIndex, 1); // Remove from hand.
  expect(placeToken(state, Player.One, Token.Blocker, index)).toStrictEqual(
    expected
  );
});

test("can place token", () => {
  const state: GameState = deepCopy(initialState);
  const index = [...Array(GRID_SIZE).keys()].find((i) =>
    isInSpawnOf(Player.One, i)
  )!; // We know at least one such index exists.
  expect(canPlaceToken(state, Player.One, Token.Blocker, index)).toBe(true);
});

test("cannot place token", () => {
  const state: GameState = deepCopy(initialState);
  expect(canPlaceToken(state, Player.One, Token.Blocker, 0)).toBe(false);
});

test("no possible placements when token is not in hand", () => {
  const state: GameState = deepCopy(initialState);
  state.hands[Player.One] = [];
  expect(possiblePlacements(state, Player.One, Token.Blocker).size).toBe(0);
});

test("all possible placements lie within spawn region", () => {
  const state: GameState = deepCopy(initialState);
  const placements = possiblePlacements(state, Player.One, Token.Blocker);
  placements.forEach((i) => {
    expect(isInSpawnOf(Player.One, i)).toBe(true);
  });
});
