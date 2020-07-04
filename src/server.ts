import { Server } from "boardgame.io/server";
import { game } from "./logic/game";

// This file isn't run by react-scripts, so we need to load variables manually.
require("dotenv").config();

const server = Server({ games: [game] });
const port = parseInt(process.env.REACT_APP_PORT ?? "8000");
server.run(port);
