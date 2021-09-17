import {
  adjacentTo,
  baseIndexOf,
  cardinallyAdjacentTo,
  diagonallyAdjacentTo,
  Direction,
  dualAdjacentTo,
  GRID_HEIGHT,
  GRID_SIZE,
  GRID_WIDTH,
  isInGrid,
  isInHome,
  isInHomeOf,
  isInSpawnOf,
  lineFrom,
} from "./grid";
import { opponentOf, Player } from "./player";

test("index is in grid", () => {
  expect(isInGrid(0)).toBeTruthy();
  expect(isInGrid(GRID_SIZE - 1)).toBeTruthy();
});

test("index is not in grid", () => {
  expect(isInGrid(-1)).toBeFalsy();
  expect(isInGrid(GRID_SIZE)).toBeFalsy();
});

test("base index is in home of player but not in home of opponent", () => {
  for (const player of [Player.One, Player.Two]) {
    const index = baseIndexOf(player);
    expect(isInHomeOf(player, index)).toBeTruthy();
    expect(isInHomeOf(opponentOf(player), index)).toBeFalsy();
    expect(isInHome(index)).toBeTruthy();
  }
});

test("index is in spawn of player but not in spawn of opponent", () => {
  for (const player of [Player.One, Player.Two]) {
    const index = baseIndexOf(player) + 2;
    expect(isInSpawnOf(player, index)).toBeTruthy();
    expect(isInSpawnOf(opponentOf(player), index)).toBeFalsy();
  }
});

test("index is cardinally adjacent to four other indices", () => {
  const index = GRID_WIDTH + 2;
  expect(cardinallyAdjacentTo(index)).toStrictEqual(
    new Set([index - GRID_WIDTH, index - 1, index + 1, index + GRID_WIDTH])
  );
});

test("index is not cardinally adjacent to indices that are out of bounds", () => {
  const index = 0;
  expect(cardinallyAdjacentTo(index)).toStrictEqual(
    new Set([index + 1, index + GRID_WIDTH])
  );
});

test("index is diagonally adjacent to four other indices", () => {
  const index = GRID_WIDTH + 2;
  expect(diagonallyAdjacentTo(index)).toStrictEqual(
    new Set([
      index - GRID_WIDTH - 1,
      index - GRID_WIDTH + 1,
      index + GRID_WIDTH - 1,
      index + GRID_WIDTH + 1,
    ])
  );
});

test("index is not diagonally adjacent to indices that are out of bounds", () => {
  const index = 0;
  expect(diagonallyAdjacentTo(index)).toStrictEqual(
    new Set([index + GRID_WIDTH + 1])
  );
});

test("index is adjacent to eight other indices", () => {
  const index = GRID_WIDTH + 2;
  expect(adjacentTo(index)).toStrictEqual(
    new Set([
      index - GRID_WIDTH - 1,
      index - GRID_WIDTH,
      index - GRID_WIDTH + 1,
      index - 1,
      index + 1,
      index + GRID_WIDTH - 1,
      index + GRID_WIDTH,
      index + GRID_WIDTH + 1,
    ])
  );
});

test("index is not adjacent to indices that are out of bounds", () => {
  const index = 0;
  expect(adjacentTo(index)).toStrictEqual(
    new Set([index + 1, index + GRID_WIDTH, index + GRID_WIDTH + 1])
  );
});

test("index is dual adjacent to 24 other indices", () => {
  const index = 2 * GRID_WIDTH + 2;
  expect(dualAdjacentTo(index).size).toBe(24);
});

test("line from index is empty when index is out of bounds", () => {
  expect(lineFrom(-1, Direction.Up)).toHaveLength(0);
});

test("line from index extends across entire grid", () => {
  expect(lineFrom(0, Direction.Right)).toHaveLength(GRID_WIDTH - 1);
  expect(lineFrom(0, Direction.Down)).toHaveLength(GRID_HEIGHT - 1);
  expect(lineFrom(GRID_SIZE - 1, Direction.Left)).toHaveLength(GRID_WIDTH - 1);
  expect(lineFrom(GRID_SIZE - 1, Direction.Up)).toHaveLength(GRID_HEIGHT - 1);
});

test("line from index on edge of grid is empty", () => {
  expect(lineFrom(0, Direction.Left)).toHaveLength(0);
  expect(lineFrom(0, Direction.Up)).toHaveLength(0);
  expect(lineFrom(GRID_SIZE - 1, Direction.Right)).toHaveLength(0);
  expect(lineFrom(GRID_SIZE - 1, Direction.Down)).toHaveLength(0);
});
