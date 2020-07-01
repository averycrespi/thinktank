# Development

## Conventions

- Parameter order: game state (e.g. pieces, hand, history), context (e.g. player, token), locations (e.g. index, coords).

## Terminology

For general terminology (e.g. board, game, player), see the [boardgame.io documentation](https://boardgame.io/documentation/#/).

- **Cell**: A location in the grid. Can be addressed by a 1D index or a 2D coordinate pair.
- **Grid**: A 2D array of cells. Each cell may contain a piece.
- **Hand**: A list of tokens that a player may place on the grid.
- **Home**: The region that a player's base must stay within. Other pieces cannot enter.
- **Piece**: A token on the grid that is owned by a player.
- **Spawn**: The region that a player may place pieces inside. Surrounds a home.
- **Token**: An abstract game entity such as a blocker, upwards tank, or base.
- **Token (simple)**: A token that does not discriminate between rotated pieces. Useful for hands.