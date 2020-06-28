// Define the size of the grid.
export const NUM_ROWS = 18;
export const NUM_COLS = 15;

// Define the size of the home area.
const HOME_OFFSET = 2;
const HOME_WIDTH = 3;
const HOME_HEIGHT = 4;

// Define the size of the safe area.
const SAFE_OFFSET = HOME_OFFSET - 1;
const SAFE_WIDTH = HOME_WIDTH + 2;
const SAFE_HEIGHT = HOME_HEIGHT + 2;

interface Bounds {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const toIndex = (x: number, y: number): number => y * NUM_COLS + x;

export const fromIndex = (index: number): [number, number] => [
  index % NUM_COLS,
  Math.floor(index / NUM_COLS),
];

const inBounds = (x: number, y: number, b: Bounds): boolean =>
  x >= b.x1 && x <= b.x2 && y >= b.y1 && y <= b.y2;

export const isHome = (x: number, y: number): boolean =>
  inBounds(x, y, {
    x1: HOME_OFFSET,
    y1: HOME_OFFSET,
    x2: HOME_OFFSET + HOME_WIDTH - 1,
    y2: HOME_OFFSET + HOME_HEIGHT - 1,
  }) ||
  inBounds(x, y, {
    x1: NUM_COLS - HOME_OFFSET - HOME_WIDTH,
    y1: NUM_ROWS - HOME_OFFSET - HOME_HEIGHT,
    x2: NUM_COLS - HOME_OFFSET - 1,
    y2: NUM_ROWS - HOME_OFFSET - 1,
  });

const isSafe = (x: number, y: number): boolean =>
  inBounds(x, y, {
    x1: SAFE_OFFSET,
    y1: SAFE_OFFSET,
    x2: SAFE_OFFSET + SAFE_WIDTH - 1,
    y2: SAFE_OFFSET + SAFE_HEIGHT - 1,
  }) ||
  inBounds(x, y, {
    x1: NUM_COLS - SAFE_OFFSET - SAFE_WIDTH,
    y1: NUM_ROWS - SAFE_OFFSET - SAFE_HEIGHT,
    x2: NUM_COLS - SAFE_OFFSET - 1,
    y2: NUM_ROWS - SAFE_OFFSET - 1,
  });

export const canPlace = (x: number, y: number): boolean =>
  isSafe(x, y) && !isHome(x, y);
