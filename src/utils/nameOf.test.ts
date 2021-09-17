import { Player } from "../logic/player";
import { nameOf } from "./nameOf";

test("name of player one is Red", () => {
  expect(nameOf(Player.One)).toBe("Red");
});

test("name of player two is Blue", () => {
  expect(nameOf(Player.Two)).toBe("Blue");
});
