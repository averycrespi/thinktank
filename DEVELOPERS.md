# Development

## Getting Started

```sh
git clone https://github.com/averycrespi/thinktank.git && cd thinktank
yarn start  # Runs the app in development mode on localhost:3000
yarn test   # Launches the interactive test runner
yarn build  # Builds the app for production
yarn serve  # Runs the server on localhost:8000
```

## Terminology

For general terminology (e.g. board, game, player), see the [boardgame.io documentation](https://boardgame.io/documentation/#/).

- **Cell**: A location in the grid. Addressed by a 1D index or a 2D coordinate pair.
- **Enemy (piece)**: P is an enemy of Q iff P and Q have _different_ owners.
- **Friendly (piece)**: P is friendly to Q iff P and Q have the _same_ owner.
- **Grid**: A 2D array of cells. Each cell may contain a piece.
- **Hand**: A list of tokens that a player may place on the grid.
- **Home**: The region that a player's base must stay within. Other pieces cannot enter.
- **Piece**: A token that is owned by a player.
- **Spawn**: The region that a player may place pieces inside. Surrounds a home.
- **Token**: A game entity such as a blocker, upwards tank, or base.
