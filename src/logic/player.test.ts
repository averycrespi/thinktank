import { nameOf, opponentOf, Player } from "./player";

test("players have meaningful names", () => {
  expect(nameOf(Player.One)).toBe("Player One");
  expect(nameOf(Player.Two)).toBe("Player Two");
});

test("opponent of player one is player two", () => {
  expect(opponentOf(Player.One)).toBe(Player.Two);
});

test("opponent of player two is player one", () => {
  expect(opponentOf(Player.Two)).toBe(Player.One);
});
