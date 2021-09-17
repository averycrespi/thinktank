import { deepCopy } from "../utils/deepCopy";
import { advanceState } from "./advance";
import { GRID_WIDTH } from "./grid";
import { opponentOf, Player } from "./player";
import { GameState, initialState } from "./state";
import { HeldToken, Token } from "./token";

test("advancing initial state does nothing", () => {
  expect(advanceState(initialState, Player.One)).toStrictEqual(initialState);
});

test("cannot cause own token to be captured", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  state.grid[0] = { owner: player, token: Token.Blocker };
  state.grid[1] = {
    owner: opponentOf(player),
    token: Token.CardinalInfiltrator,
  };
  expect(advanceState(state, player)).toBeNull();
});

test("capture enemy token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  state.grid[0] = { owner: opponentOf(player), token: Token.Blocker };
  state.grid[1] = { owner: player, token: Token.CardinalInfiltrator };
  const expected: GameState = deepCopy(initialState);
  expected.grid[0] = { owner: player, token: Token.Blocker };
  expected.grid[1] = { owner: player, token: Token.CardinalInfiltrator };
  expect(advanceState(state, player)).toStrictEqual(expected);
});

test("cannot cause own (non-mine) token to be shot", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  state.grid[0] = { owner: player, token: Token.UpTank };
  state.grid[1] = {
    owner: opponentOf(player),
    token: Token.LeftTank,
  };
  expect(advanceState(state, player)).toBeNull();
});

test("shoot enemy token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const opponent = opponentOf(player);
  state.grid[0] = { owner: opponent, token: Token.UpTank };
  state.grid[1] = { owner: player, token: Token.LeftTank };
  const expected: GameState = deepCopy(initialState);
  expected.grid[0] = null;
  expected.grid[1] = state.grid[1];
  expected.hands[opponent].push(HeldToken.Tank);
  expect(advanceState(state, player)).toStrictEqual(expected);
});

test("explode own mine and adjacent enemy token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const opponent = opponentOf(player);
  state.grid[0] = { owner: player, token: Token.Mine };
  state.grid[1] = { owner: opponent, token: Token.UpTank };
  const expected: GameState = deepCopy(initialState);
  expected.grid[0] = null;
  expected.grid[1] = null;
  expected.hands[player].push(HeldToken.Mine);
  expected.hands[opponent].push(HeldToken.Tank);
  expect(advanceState(state, player)).toStrictEqual(expected);
});

test("explode own mine when shot", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const opponent = opponentOf(player);
  state.grid[0] = { owner: player, token: Token.Mine };
  state.grid[2] = { owner: opponent, token: Token.LeftTank };
  const expected: GameState = deepCopy(initialState);
  expected.grid[0] = null;
  expected.grid[2] = state.grid[2];
  expected.hands[player].push(HeldToken.Mine);
  expect(advanceState(state, player)).toStrictEqual(expected);
});

test("cannot cause own (non-mine) token to be exploded by enemy mine", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const opponent = opponentOf(player);
  state.grid[0] = { owner: player, token: Token.UpTank };
  state.grid[1] = { owner: opponent, token: Token.Mine };
  expect(advanceState(state, player)).toBeNull();
});

test("cannot cause own (non-mine) token to be exploded by friendly mine", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const opponent = opponentOf(player);
  state.grid[0] = { owner: player, token: Token.UpTank };
  state.grid[1] = { owner: player, token: Token.Mine };
  state.grid[2] = { owner: opponent, token: Token.UpTank };
  expect(advanceState(state, player)).toBeNull();
});

test("capture enemy tank that shoots enemy mine and destroys adjacent enemy token", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const opponent = opponentOf(player);
  state.grid[0] = { owner: player, token: Token.CardinalInfiltrator };
  state.grid[1] = { owner: opponent, token: Token.RightTank };
  state.grid[3] = { owner: opponent, token: Token.Mine };
  state.grid[4] = { owner: opponent, token: Token.DiagonalInfiltrator };
  const expected: GameState = deepCopy(initialState);
  expected.grid[0] = state.grid[0];
  expected.grid[1] = { owner: player, token: Token.RightTank };
  expected.grid[3] = null;
  expected.grid[4] = null;
  expected.hands[opponent].push(HeldToken.Mine, HeldToken.DiagonalInfiltrator);
  expect(advanceState(state, player)).toStrictEqual(expected);
});

test("capture enemy blocker that was protecting enemy token from friendly tank", () => {
  const state: GameState = deepCopy(initialState);
  const player = Player.One;
  const opponent = opponentOf(player);
  state.grid[0] = { owner: player, token: Token.RightTank };
  state.grid[1] = { owner: opponent, token: Token.Blocker };
  state.grid[3] = { owner: opponent, token: Token.UpTank };
  state.grid[1 + GRID_WIDTH] = {
    owner: player,
    token: Token.CardinalInfiltrator,
  };
  const expected: GameState = deepCopy(initialState);
  expected.grid[0] = state.grid[0];
  expected.grid[1] = { owner: player, token: Token.Blocker };
  expected.grid[3] = null;
  expected.grid[1 + GRID_WIDTH] = state.grid[1 + GRID_WIDTH];
  expected.hands[opponent].push(HeldToken.Tank);
  expect(advanceState(state, player)).toStrictEqual(expected);
});
