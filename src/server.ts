import { Server } from "boardgame.io/server";
import { game } from "./logic/game";

const server = Server({ games: [game] });

server.run(8000);
