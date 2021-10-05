import { Player } from "../logic/player";
import { classOf } from "./classOf";

test("players have correct CSS classes", () => {
  expect(classOf(Player.One)).toBe("player-one");
  expect(classOf(Player.Two)).toBe("player-two");
});
