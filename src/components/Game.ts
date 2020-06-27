import { NUM_COLS, NUM_ROWS } from "../common";

const Game = {
  setup: () => ({ cells: Array(NUM_ROWS * NUM_COLS).fill(null) }),
};

export default Game;
