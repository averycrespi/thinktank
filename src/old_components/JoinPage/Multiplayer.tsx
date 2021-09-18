import Board from "../Board";
import { Client } from "boardgame.io/react";
import Loading from "./Loading";
import React from "react";
import { SocketIO } from "boardgame.io/multiplayer";
import { game } from "../../logic/game";
import { Player } from "../../logic/player";

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
    numPlayers: 2,
    debug: false,
    loading: Loading,
  });
  return (
    <div className="row flex-center">
      <div className="col no-padding">
        <MultiplayerClient
          matchID={matchID}
          playerID={player}
          credentials={credentials}
          debug={false}
        />
      </div>
    </div>
  );
};

export default Multiplayer;
