import { NUM_COLS, NUM_ROWS, coordsToIndex, indexToCoords } from "./grid";

test("indexToCoords undoes coordsToIndex", () => {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      expect(indexToCoords(coordsToIndex({ x, y }))).toStrictEqual({ x, y });
    }
  }
});
