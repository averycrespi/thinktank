import { Player } from "./player";

// Defines the dimensions of the grid.
export const GRID_WIDTH = 15;
export const GRID_HEIGHT = 18;
export const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;

/**
 * Represents a coordinate pair.
 *
 * We use a dual-coordinate system for convenience and performance reasons.
 * Exported functions will accept and return 1D indices, but may use 2D coordinate pairs internally.
 */
interface Coords {
  x: number;
  y: number;
}

/** Convert a coordinate pair to an index. */
const toIndex = ({ x, y }: Coords): number => y * GRID_WIDTH + x;

/** Convert an index to a coordinate pair. */
const toCoords = (index: number): Coords => ({
  x: index % GRID_WIDTH,
  y: Math.floor(index / GRID_WIDTH),
});

/**
 * Represents a rectangular region on the grid.
 *
 * Includes topLeft and excludes bottomRight.
 */
interface Bounds {
  topLeft: Coords;
  bottomRight: Coords;
}

/** Check if a coordinate pair is inside of a rectangular region. */
const isInBounds = (
  { x, y }: Coords,
  { topLeft, bottomRight }: Bounds
): boolean =>
  x >= topLeft.x && x < bottomRight.x && y >= topLeft.y && y < bottomRight.y;

/** Defines the bounds of the entire grid. */
const GRID_BOUNDS = {
  topLeft: { x: 0, y: 0 },
  bottomRight: { x: GRID_WIDTH, y: GRID_HEIGHT },
};

/** Check if an index is inside the grid. */
export const isInGrid = (index: number): boolean =>
  index >= 0 && index < GRID_SIZE;

// Defines the offset and dimensions of the home regions.
const HOME_OFFSET = 2;
const HOME_WIDTH = 3;
const HOME_HEIGHT = 4;

/** Check if an index is inside the home region of a particular player. */
export const isInHomeOf = (player: Player, index: number): boolean => {
  const coords = toCoords(index);
  switch (player) {
    case Player.One:
      return isInBounds(coords, {
        topLeft: { x: HOME_OFFSET, y: HOME_OFFSET },
        bottomRight: {
          x: HOME_OFFSET + HOME_WIDTH,
          y: HOME_OFFSET + HOME_HEIGHT,
        },
      });
    case Player.Two:
      return isInBounds(coords, {
        topLeft: {
          x: GRID_WIDTH - HOME_OFFSET - HOME_WIDTH,
          y: GRID_HEIGHT - HOME_OFFSET - HOME_HEIGHT,
        },
        bottomRight: {
          x: GRID_WIDTH - HOME_OFFSET,
          y: GRID_HEIGHT - HOME_OFFSET,
        },
      });
  }
};

/** Check if an index is inside of the home region of any player. */
export const isInHome = (index: number): boolean =>
  isInHomeOf(Player.One, index) || isInHomeOf(Player.Two, index);

// Defines the offset and dimensions of the spawn regions.
// Each spawn region surrounds a home region, but does not include it.
const SPAWN_OFFSET = HOME_OFFSET - 1;
const SPAWN_WIDTH = HOME_WIDTH + 2;
const SPAWN_HEIGHT = HOME_HEIGHT + 2;

/** Check if an index is inside the spawn region of a particular player. */
export const isInSpawnOf = (player: Player, index: number): boolean => {
  if (isInHomeOf(player, index)) {
    return false;
  }
  const coords = toCoords(index);
  switch (player) {
    case Player.One:
      return isInBounds(coords, {
        topLeft: { x: SPAWN_OFFSET, y: SPAWN_OFFSET },
        bottomRight: {
          x: SPAWN_OFFSET + SPAWN_WIDTH,
          y: SPAWN_OFFSET + SPAWN_HEIGHT,
        },
      });
    case Player.Two:
      return isInBounds(coords, {
        topLeft: {
          x: GRID_WIDTH - SPAWN_OFFSET - SPAWN_WIDTH,
          y: GRID_HEIGHT - SPAWN_OFFSET - SPAWN_HEIGHT,
        },
        bottomRight: {
          x: GRID_WIDTH - SPAWN_OFFSET,
          y: GRID_HEIGHT - SPAWN_OFFSET,
        },
      });
  }
};

// Defines the center offset of the home regions.
const HOME_CENTER_OFFSET = 3;

/** Returns the initial index of a player's base token. */
export const baseIndexOf = (player: Player): number => {
  switch (player) {
    case Player.One:
      return toIndex({
        x: HOME_CENTER_OFFSET,
        y: HOME_CENTER_OFFSET,
      });
    case Player.Two:
      return toIndex({
        x: GRID_WIDTH - HOME_CENTER_OFFSET - 1,
        y: GRID_HEIGHT - HOME_CENTER_OFFSET - 1,
      });
  }
};

/**
 * Apply offsets to an index.
 *
 * Results that lie outside of the grid are discarded.
 */
const withOffsets = (
  index: number,
  offsets: Array<[number, number]>
): Set<number> => {
  const before = toCoords(index);
  const indices = new Set<number>();
  for (const [dx, dy] of offsets) {
    const after = { x: before.x + dx, y: before.y + dy };
    // We use isInBounds instead of isInGrid because converting out-of-bounds
    // coordinates to an index might produce an incorrect result.
    if (isInBounds(after, GRID_BOUNDS)) {
      indices.add(toIndex(after));
    }
  }
  return indices;
};

/** Find indices that are cardinally adjacent to an index. */
export const cardinallyAdjacentTo = (index: number): Set<number> =>
  withOffsets(index, [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ]);

/** Find indices that are diagonally adjacent to an index. */
export const diagonallyAdjacentTo = (index: number): Set<number> =>
  withOffsets(index, [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]);

/** Find indices that are adjacent to an index. */
export const adjacentTo = (index: number): Set<number> =>
  new Set([...cardinallyAdjacentTo(index), ...diagonallyAdjacentTo(index)]);

/** Find indices that are dual-adjacent to an index. */
export const dualAdjacentTo = (index: number): Set<number> => {
  const dualAdj = new Set<number>();
  for (const adjIndex of adjacentTo(index)) {
    dualAdj.add(adjIndex);
    for (const dualAdjIndex of adjacentTo(adjIndex)) {
      dualAdj.add(dualAdjIndex);
    }
  }
  dualAdj.delete(index); // An index is not dual-adjacent to itself.
  return dualAdj;
};

/** Represents a cardinal direction. */
export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

/**
 * Return the indices in a straight line from a starting index.
 *
 * Excludes the starting index.
 */
export const lineFrom = (
  start: number,
  direction: Direction
): Array<number> => {
  if (!isInGrid(start)) {
    return [];
  }
  let line: Array<number> = [];
  const { x: startX, y: startY } = toCoords(start);
  switch (direction) {
    case Direction.Up:
      for (let y = startY - 1; y >= 0; y--) {
        line.push(toIndex({ x: startX, y }));
      }
      break;
    case Direction.Down:
      for (let y = startY + 1; y < GRID_HEIGHT; y++) {
        line.push(toIndex({ x: startX, y }));
      }
      break;
    case Direction.Left:
      for (let x = startX - 1; x >= 0; x--) {
        line.push(toIndex({ x, y: startY }));
      }
      break;
    case Direction.Right:
      for (let x = startX + 1; x < GRID_WIDTH; x++) {
        line.push(toIndex({ x, y: startY }));
      }
  }
  return line;
};
