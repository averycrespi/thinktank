import { Link, useParams } from "react-router-dom";
import { Player, nameOf, opponentOf } from "../../logic";
import React, { useEffect, useState } from "react";

import Multiplayer from "../Multiplayer";
import { joinMatch } from "../../api/match";

interface JoinMatchProps {
  serverURL: string;
}

interface Params {
  matchID: string;
  player: Player;
}

/** Join a match when the page is loaded. */
const JoinMatch = ({ serverURL }: JoinMatchProps) => {
  const { matchID, player }: Params = useParams();
  const [credentials, setCredentials] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    joinMatch(serverURL, matchID, player)
      .then((creds) => setCredentials(creds))
      .catch((err) => setError(err.toString()));
  }, [serverURL, matchID, player]);

  const shareURL = `${window.location.origin}/join/${matchID}/${opponentOf(
    player
  )}`;

  return (
    <div id="join">
      {credentials && (
        <Multiplayer
          serverURL={serverURL}
          matchID={matchID}
          player={player}
          credentials={credentials}
        />
      )}
      {error && <p>{error}</p>}
      <div>
        {credentials && !error && (
          <a href={shareURL}>Click to play as {nameOf(opponentOf(player))}</a>
        )}
      </div>
      <div>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
};

export default JoinMatch;
