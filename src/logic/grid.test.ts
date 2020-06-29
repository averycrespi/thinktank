import {
  BLUE_HOME_CENTER,
  NUM_COLS,
  NUM_ROWS,
  RED_HOME_CENTER,
  coordsToIndex,
  indexToCoords,
  isBlueHome,
  isBlueSpawn,
  isRedHome,
  isRedSpawn,
} from "./grid";

test("indexToCoords is inverse of coordsToIndex", () => {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      expect(indexToCoords(coordsToIndex({ x, y }))).toStrictEqual({ x, y });
    }
  }
});

test("home regions and spawn regions do not overlap", () => {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      const index = coordsToIndex({ x, y });
      expect(isRedHome(index) && isRedSpawn(index)).toBe(false);
      expect(isBlueHome(index) && isBlueSpawn(index)).toBe(false);
    }
  }
});

test("home centers lie within home regions", () => {
  expect(isRedHome(RED_HOME_CENTER)).toBe(true);
  expect(isBlueHome(BLUE_HOME_CENTER)).toBe(true);
});
