import Board from "../Board";
import { Client } from "boardgame.io/react";
import { Player } from "../../logic";
import React from "react";
import { SocketIO } from "boardgame.io/multiplayer";
import { game } from "../../logic/game";

interface MultiplayerProps {
  serverURL: string;
  matchID: string;
  player?: Player;
  credentials?: string;
}

const Multiplayer = ({
  serverURL,
  matchID,
  player,
  credentials,
}: MultiplayerProps) => {
  const MultiplayerClient = Client({
    game,
    board: Board,
    multiplayer: SocketIO({ server: serverURL }),
  });
  return (
    <div id="remote">
      <MultiplayerClient
        gameID={matchID}
        playerID={player}
        credentials={credentials}
        debug={false}
      />
    </div>
  ); // TODO: add loading component
};

export default Multiplayer;
