import { Player } from "../logic/player";
import { colorClassOf } from "./colorClassOf";

test("colour class of player one is red", () => {
  expect(colorClassOf(Player.One)).toBe("red");
});

test("colour class of player two is blue", () => {
  expect(colorClassOf(Player.Two)).toBe("blue");
});
