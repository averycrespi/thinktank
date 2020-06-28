import { NUM_COLS, NUM_ROWS } from "../logic/grid";

const Game = {
  setup: () => ({ cells: Array(NUM_ROWS * NUM_COLS).fill(null) }),
  moves: {
    clickCell: (G: any, ctx: any, index: number) => {
      G.cells[index] = ctx.currentPlayer;
    },
  },
};

export default Game;
