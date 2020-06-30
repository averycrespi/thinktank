import { GRID_HEIGHT, GRID_WIDTH } from "./grid";

import { Player } from ".";
import { canShootFromBelow } from "./threat";

describe("can shoot", () => {
  const empty = new Array(GRID_WIDTH * GRID_HEIGHT).fill(null);
  const player = Player.Red;
  const opponent = Player.Blue;
  describe("from below", () => {
    test("with no pieces", () =>
      expect(canShootFromBelow(empty, player, opponent, 0)).toBe(false));
  });
});

// TODO: write more threat tests
