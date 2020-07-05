import Board from "../Board";
import { Client } from "boardgame.io/react";
import { Player } from "../../logic";
import React from "react";
import { SocketIO } from "boardgame.io/multiplayer";
import { game } from "../../logic/game";

const serverURL = process.env.REACT_APP_URL ?? "http://localhost:8000";

const RemoteMultiplayerClient = Client({
  game,
  board: Board,
  multiplayer: SocketIO({ server: serverURL }),
});

interface RemoteMultiplayerProps {
  matchID: string;
  player: Player;
}

/** Render a remote multiplayer game. */
const RemoteMultiplayer = ({ matchID, player }: RemoteMultiplayerProps) => (
  <div id="remote">
    <RemoteMultiplayerClient gameID={matchID} playerID={player} />
  </div>
);

export default RemoteMultiplayer;
