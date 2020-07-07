# Development

## Getting started

Requires [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/).

```sh
git clone https://github.com/averycrespi/thinktank.git && cd thinktank
yarn        # Install dependencies
yarn start  # Run the client in development mode on localhost:3000
yarn test   # Launch the interactive test runner
yarn build  # Build the client for production
yarn serve  # Run the server on localhost:8000
```

**Warning**: When running on `localhost`, you may experience errors related to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

To fix these errors, you can:

1. Disable CORS in your browser (not recommended), or
2. Run the server on an domain with the appropriate CORS headers.

## Environment variables

See the [Create React App docs](https://create-react-app.dev/docs/adding-custom-environment-variables/) for more information.

- `REACT_APP_URL`: URL of the server. Default is `"http://localhost:8000"`.
- `REACT_APP_PORT`: Port that the server will be hosted on. Default is `"8000"`.

## Hosting your own instance

You can easily host your own instance with [Netlify](https://www.netlify.com/) and [DigitalOcean](https://www.digitalocean.com/).

Make sure that you set `REACT_APP_URL` for the client.

Example configuration for proxying the server with [Caddy](https://caddyserver.com/):

```
# ./Caddyfile

# Note: This config was written for Caddy v1.

thinktank-server.example.com {
    # Allow requests from dev/prod clients.
    header / {
        Access-Control-Allow-Origin *
    }
    # Forward requests to the server at localhost:8000.
    proxy / 127.0.0.1:8000 {
        transparent
    }
}
```

## Terminology

For general terminology (e.g. board, game, player), see the [boardgame.io docs](https://boardgame.io/documentation/#/).

- **Cell**: A location in the grid. Addressed by a 1D index or a 2D coordinate pair.
- **Enemy (piece)**: P is an enemy of Q iff P and Q have _different_ owners.
- **Friendly (piece)**: P is friendly to Q iff P and Q have the _same_ owner.
- **Grid**: A 2D array of cells. Each cell may contain a piece.
- **Hand**: A list of tokens that a player may place on the grid.
- **Home**: The region that a player's base must stay within. Other pieces cannot enter.
- **Piece**: A token that is owned by a player.
- **Spawn**: The region that a player may place pieces inside. Surrounds a home.
- **Token**: A game entity such as a blocker, upwards tank, or base.
