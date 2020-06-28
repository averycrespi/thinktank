export const NUM_ROWS = 18;
export const NUM_COLS = 15;

export const toIndex = (x: number, y: number): number => y * NUM_COLS + x;

const HOME_OFFSET = 2;
const HOME_WIDTH = 3;
const HOME_HEIGHT = 4;

export const isHome = (x: number, y: number) => {
  if (
    x >= HOME_OFFSET &&
    x < HOME_OFFSET + HOME_WIDTH &&
    y >= HOME_OFFSET &&
    y < HOME_OFFSET + HOME_HEIGHT
  ) {
    return true; // Top-left home.
  } else if (
    x < NUM_COLS - HOME_OFFSET &&
    x >= NUM_COLS - HOME_OFFSET - HOME_WIDTH &&
    y < NUM_ROWS - HOME_OFFSET &&
    y >= NUM_ROWS - HOME_OFFSET - HOME_HEIGHT
  ) {
    return true; // Bottom-right home.
  } else {
    return false;
  }
};
