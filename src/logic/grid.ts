export const NUM_ROWS = 18;
export const NUM_COLS = 15;

interface Coords {
  x: number;
  y: number;
}

export const coordsToIndex = ({ x, y }: Coords): number => y * NUM_COLS + x;

export const indexToCoords = (index: number): Coords => ({
  x: index % NUM_COLS,
  y: Math.floor(index / NUM_COLS),
});

interface Bounds {
  topLeft: Coords;
  bottomRight: Coords;
}

const inBounds = (
  { x, y }: Coords,
  { topLeft, bottomRight }: Bounds
): boolean =>
  x >= topLeft.x && x <= bottomRight.x && y >= topLeft.y && y <= bottomRight.y;

const HOME_OFFSET = 2;
const HOME_WIDTH = 3;
const HOME_HEIGHT = 4;

export const isRedHome = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: { x: HOME_OFFSET, y: HOME_OFFSET },
    bottomRight: {
      x: HOME_OFFSET + HOME_WIDTH - 1,
      y: HOME_OFFSET + HOME_HEIGHT - 1,
    },
  });

export const isBlueHome = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: {
      x: NUM_COLS - HOME_OFFSET - HOME_WIDTH,
      y: NUM_ROWS - HOME_OFFSET - HOME_HEIGHT,
    },
    bottomRight: {
      x: NUM_COLS - HOME_OFFSET - 1,
      y: NUM_ROWS - HOME_OFFSET - 1,
    },
  });

const SPAWN_OFFSET = HOME_OFFSET - 1;
const SPAWN_WIDTH = HOME_WIDTH + 2;
const SPAWN_HEIGHT = HOME_HEIGHT + 2;

export const isRedSpawn = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: { x: SPAWN_OFFSET, y: SPAWN_OFFSET },
    bottomRight: {
      x: SPAWN_OFFSET + SPAWN_WIDTH - 1,
      y: SPAWN_OFFSET + SPAWN_HEIGHT - 1,
    },
  }) && !isRedHome(index);

export const isBlueSpawn = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: {
      x: NUM_COLS - SPAWN_OFFSET - SPAWN_WIDTH,
      y: NUM_ROWS - SPAWN_OFFSET - SPAWN_HEIGHT,
    },
    bottomRight: {
      x: NUM_COLS - SPAWN_OFFSET - 1,
      y: NUM_ROWS - SPAWN_OFFSET - 1,
    },
  }) && !isBlueHome(index);

const HOME_CENTER_OFFSET = 3;

export const RED_HOME_CENTER = coordsToIndex({
  x: HOME_CENTER_OFFSET,
  y: HOME_CENTER_OFFSET,
});

export const BLUE_HOME_CENTER = coordsToIndex({
  x: NUM_COLS - HOME_CENTER_OFFSET - 1,
  y: NUM_ROWS - HOME_CENTER_OFFSET - 1,
});
