export const NUM_ROWS = 18;
export const NUM_COLS = 15;

export interface Coords {
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

export const isRedHome = (coords: Coords): boolean =>
  inBounds(coords, {
    topLeft: { x: HOME_OFFSET, y: HOME_OFFSET },
    bottomRight: {
      x: HOME_OFFSET + HOME_WIDTH - 1,
      y: HOME_OFFSET + HOME_HEIGHT - 1,
    },
  });

export const isBlueHome = (coords: Coords): boolean =>
  inBounds(coords, {
    topLeft: {
      x: NUM_COLS - HOME_OFFSET - HOME_WIDTH,
      y: NUM_ROWS - HOME_OFFSET - HOME_HEIGHT,
    },
    bottomRight: {
      x: NUM_COLS - HOME_OFFSET - 1,
      y: NUM_ROWS - HOME_OFFSET - 1,
    },
  });

const SAFE_OFFSET = HOME_OFFSET - 1;
const SAFE_WIDTH = HOME_WIDTH + 2;
const SAFE_HEIGHT = HOME_HEIGHT + 2;

export const isRedSafe = (coords: Coords): boolean =>
  inBounds(coords, {
    topLeft: { x: SAFE_OFFSET, y: SAFE_OFFSET },
    bottomRight: {
      x: SAFE_OFFSET + SAFE_WIDTH - 1,
      y: SAFE_OFFSET + SAFE_HEIGHT - 1,
    },
  });

export const isBlueSafe = (coords: Coords): boolean =>
  inBounds(coords, {
    topLeft: {
      x: NUM_COLS - SAFE_OFFSET - SAFE_WIDTH,
      y: NUM_ROWS - SAFE_OFFSET - SAFE_HEIGHT,
    },
    bottomRight: {
      x: NUM_COLS - SAFE_OFFSET - 1,
      y: NUM_ROWS - SAFE_OFFSET - 1,
    },
  });

const BASE_OFFSET = 3;

export const redBaseSpawn = (): Coords => ({ x: BASE_OFFSET, y: BASE_OFFSET });

export const blueBaseSpawn = (): Coords => ({
  x: NUM_COLS - BASE_OFFSET - 1,
  y: NUM_ROWS - BASE_OFFSET - 1,
});
