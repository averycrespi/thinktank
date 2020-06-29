import {
  BLUE_HOME_CENTER,
  GRID_WIDTH,
  GRID_HEIGHT,
  RED_HOME_CENTER,
  coordsToIndex,
  indexToCoords,
  isBlueHome,
  isBlueSpawn,
  isRedHome,
  isRedSpawn,
} from "./grid";

test("indexToCoords is inverse of coordsToIndex", () => {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      expect(indexToCoords(coordsToIndex({ x, y }))).toStrictEqual({ x, y });
    }
  }
});

test("home regions and spawn regions do not overlap", () => {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
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
