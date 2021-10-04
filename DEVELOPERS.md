# Development

- [Development](#development)
  - [Running locally](#running-locally)
  - [Running with Docker](#running-with-docker)
  - [Environment variables](#environment-variables)
  - [Hosting your own instance](#hosting-your-own-instance)

## Running locally

Requires [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/).

```sh
git clone https://github.com/averycrespi/thinktank.git && cd thinktank
yarn install        # Install dependencies
yarn test           # Run tests
yarn test:coverage  # Run tests with coverage
yarn start          # Start the client in development mode
yarn build:client   # Build the client for production
yarn build:server   # Build the server for production
yarn run:client     # Run the client in production mode
yarn run:server     # Run the server in production mode
```

## Running with Docker

Requires [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

```sh
docker-compose build    # Build the client and server images
docker-compose up -d    # Start the client and server containers
```

## Environment variables

**Note**: All variables must be prefixed with `REACT_APP_` due to [Create React App constraints](https://create-react-app.dev/docs/adding-custom-environment-variables/).

The following environment variables are supported:

- `REACT_APP_SERVER_URL`: URL of the server. Default is `http://localhost:8000`.
- `REACT_APP_SERVER_PORT`: Port that the server will bind to. Default is `8000`.

## Hosting your own instance

You can easily host your own instance with [Netlify](https://www.netlify.com/) and [DigitalOcean](https://www.digitalocean.com/).

Make sure that you set `REACT_APP_SERVER_URL` for the client.

Here is an example configuration for proxying the server with [Caddy](https://caddyserver.com/):

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
