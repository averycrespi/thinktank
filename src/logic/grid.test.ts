import { NUM_COLS, NUM_ROWS, fromIndex, toIndex } from "./grid";

test("fromIndex undoes toIndex", () => {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      expect(fromIndex(toIndex(x, y))).toStrictEqual([x, y]);
    }
  }
});
