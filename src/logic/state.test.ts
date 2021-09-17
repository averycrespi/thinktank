import { deepCopy } from "../utils/deepCopy";
import { baseIndexOf } from "./grid";
import { Player } from "./player";
import { GameState, initialState, winnerOf } from "./state";
import { Token } from "./token";

test("initial grid contains one base for each player", () => {
  for (const player of [Player.One, Player.Two]) {
    expect(
      initialState.grid.filter(
        (t) => t && t.owner === player && t.token === Token.Base
      )
    ).toHaveLength(1);
  }
});

test("both players have the same initial hand", () => {
  expect(initialState.hands[Player.One]).toStrictEqual(
    initialState.hands[Player.Two]
  );
});

test("initial state has no winner", () => {
  expect(winnerOf(initialState)).toBeNull();
});

test("owner of the single remaining base wins", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[baseIndexOf(Player.One)] = null;
  expect(winnerOf(state)).toBe(Player.Two);
});

test("owner of both bases wins", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[baseIndexOf(Player.One)]!.owner = Player.One;
  state.grid[baseIndexOf(Player.Two)]!.owner = Player.One;
  expect(winnerOf(state)).toBe(Player.One);
});

test("state has no winner when there are no bases", () => {
  const state: GameState = deepCopy(initialState);
  state.grid[baseIndexOf(Player.One)] = null;
  state.grid[baseIndexOf(Player.Two)] = null;
  expect(winnerOf(state)).toBeNull();
});
