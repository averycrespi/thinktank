// Defines the dimensions of the grid.
export const GRID_HEIGHT = 18;
export const GRID_WIDTH = 15;

/** Represents a coordinate pair. */
export interface Coords {
  x: number;
  y: number;
}

/** Convert a coordinate pair to an index. */
export const coordsToIndex = ({ x, y }: Coords): number => y * GRID_WIDTH + x;

/** Convert an index to a coordinate pair. */
export const indexToCoords = (index: number): Coords => ({
  x: index % GRID_WIDTH,
  y: Math.floor(index / GRID_WIDTH),
});

/** Represents a rectangular region. Includes topLeft and excludes bottomRight. */
interface Bounds {
  topLeft: Coords;
  bottomRight: Coords;
}

/** Defines the bounds of the grid. */
const GRID_BOUNDS = {
  topLeft: { x: 0, y: 0 },
  bottomRight: { x: GRID_WIDTH, y: GRID_HEIGHT },
};

/** Check if a coordinate pair is inside some bounds. */
const inBounds = (
  { x, y }: Coords,
  { topLeft, bottomRight }: Bounds
): boolean =>
  x >= topLeft.x && x < bottomRight.x && y >= topLeft.y && y < bottomRight.y;

// Defines the offset and dimensions of the home regions.
const HOME_OFFSET = 2;
const HOME_WIDTH = 3;
const HOME_HEIGHT = 4;

/** Check if an index is inside the red home region. */
export const isRedHome = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: { x: HOME_OFFSET, y: HOME_OFFSET },
    bottomRight: {
      x: HOME_OFFSET + HOME_WIDTH,
      y: HOME_OFFSET + HOME_HEIGHT,
    },
  });

/** Check if an index is inside the blue home region. */
export const isBlueHome = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: {
      x: GRID_WIDTH - HOME_OFFSET - HOME_WIDTH,
      y: GRID_HEIGHT - HOME_OFFSET - HOME_HEIGHT,
    },
    bottomRight: {
      x: GRID_WIDTH - HOME_OFFSET,
      y: GRID_HEIGHT - HOME_OFFSET,
    },
  });

/** Check if an index is inside either home region */
export const isHome = (index: number): boolean =>
  isRedHome(index) || isBlueHome(index);

// Defines the offset and dimensions of the spawn regions.
// Each spawn surrounds a home, but does not include it.
const SPAWN_OFFSET = HOME_OFFSET - 1;
const SPAWN_WIDTH = HOME_WIDTH + 2;
const SPAWN_HEIGHT = HOME_HEIGHT + 2;

/** Check if an index is inside the red spawn region. */
export const isRedSpawn = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: { x: SPAWN_OFFSET, y: SPAWN_OFFSET },
    bottomRight: {
      x: SPAWN_OFFSET + SPAWN_WIDTH,
      y: SPAWN_OFFSET + SPAWN_HEIGHT,
    },
  }) && !isRedHome(index);

/** Check if an index is inside the blue spawn region. */
export const isBlueSpawn = (index: number): boolean =>
  inBounds(indexToCoords(index), {
    topLeft: {
      x: GRID_WIDTH - SPAWN_OFFSET - SPAWN_WIDTH,
      y: GRID_HEIGHT - SPAWN_OFFSET - SPAWN_HEIGHT,
    },
    bottomRight: {
      x: GRID_WIDTH - SPAWN_OFFSET,
      y: GRID_HEIGHT - SPAWN_OFFSET,
    },
  }) && !isBlueHome(index);

// Defines the center offset of the home regions.
const HOME_CENTER_OFFSET = 3;

/** Defines the center of the red home region. */
export const RED_HOME_CENTER = coordsToIndex({
  x: HOME_CENTER_OFFSET,
  y: HOME_CENTER_OFFSET,
});

/** Defines the center of the blue home region. */
export const BLUE_HOME_CENTER = coordsToIndex({
  x: GRID_WIDTH - HOME_CENTER_OFFSET - 1,
  y: GRID_HEIGHT - HOME_CENTER_OFFSET - 1,
});

/** Apply offsets to an index. Results outside the grid are discarded. */
const withOffsets = (
  index: number,
  offsets: Array<[number, number]>
): Set<number> => {
  const before = indexToCoords(index);
  const indices = new Set<number>();
  for (const [dx, dy] of offsets) {
    const after = { x: before.x + dx, y: before.y + dy };
    if (inBounds(after, GRID_BOUNDS)) {
      indices.add(coordsToIndex(after));
    }
  }
  return indices;
};

/** Find indices orthogonally adjacent to an index. */
export const orthogonallyAdjacentTo = (index: number): Set<number> =>
  withOffsets(index, [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ]);

/** Find indices diagonally adjacent to an index. */
export const diagonallyAdjacentTo = (index: number): Set<number> =>
  withOffsets(index, [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]);

/** Find indices adjacent to an index. */
export const adjacentTo = (index: number): Set<number> =>
  new Set([...orthogonallyAdjacentTo(index), ...diagonallyAdjacentTo(index)]);

/** Find indices dual-adjacent to an index. */
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
