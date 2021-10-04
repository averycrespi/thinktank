import { nameOf, opponentOf, Player } from "./player";

test("player one has name", () => {
  expect(nameOf(Player.One)).toBe("Player One");
});

test("player two has name", () => {
  expect(nameOf(Player.Two)).toBe("Player Two");
});

test("opponent of player one is player two", () => {
  expect(opponentOf(Player.One)).toBe(Player.Two);
});

test("opponent of player two is player one", () => {
  expect(opponentOf(Player.Two)).toBe(Player.One);
});
