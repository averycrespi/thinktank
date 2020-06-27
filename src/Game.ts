export const TicTacToe = {
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell: (G: any, ctx: any, id: number) => {
      G.cells[id] = ctx.currentPlayer;
    },
  },
};
