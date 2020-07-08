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

/** Render a multiplayer game. */
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
    numPlayers: 2,
    debug: false,
  });
  return (
    <div className="row flex-center">
      <div className="col no-padding">
        <MultiplayerClient
          gameID={matchID}
          playerID={player}
          credentials={credentials}
          debug={false}
        />
      </div>
    </div>
  );
};

export default Multiplayer;
