import { opponentOf, Player } from "./player";

test("opponent of player one is player two", () => {
  expect(opponentOf(Player.One)).toBe(Player.Two);
});

test("opponent of player two is player one", () => {
  expect(opponentOf(Player.Two)).toBe(Player.One);
});
