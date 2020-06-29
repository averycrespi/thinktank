# Development

## Terminology

For general terminology (e.g. board, game, player), see the [boardgames.io documentation](https://boardgame.io/documentation/#/).

- **Cell**: A location in the grid. Can be addressed by a 1D index or a 2D coordinate pair.
- **Grid**: A 2D array of cells. Each cell may contain a piece.
- **Home (of a player)**: The region that a player's base must stay within.
- **Neighborhood (of a piece)**: The region that a piece could move to under ideal conditions.
- **Piece**: A token on the grid that is owned by a player.
- **Spawn (of a player)**: The region that a player may place pieces inside. Surrounds a home.
- **Token**: An abstract game entity such as a blocker, tank, or base.