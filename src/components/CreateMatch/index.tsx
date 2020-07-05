import { Player, nameOf } from "../../logic";
import React, { useState } from "react";
import { Visibility, createMatch } from "../../api/match";

import { useHistory } from "react-router-dom";

interface CreateMatchProps {
  serverURL: string;
}

/** Create a private match when a button is clicked. */
const CreateMatch = ({ serverURL }: CreateMatchProps) => {
  const history = useHistory();
  const [player, setPlayer] = useState(Player.Red);
  const [clicked, setClicked] = useState(false);
  const [matchID, setMatchID] = useState("");
  const [error, setError] = useState("");

  const onClick = () => {
    setClicked(true);
    createMatch(serverURL, Visibility.PRIVATE)
      .then((id) => setMatchID(id))
      .catch((err) => setError(err.toString()));
  };

  return (
    <div id="create">
      <button disabled={clicked} onClick={onClick}>
        Create private match
      </button>
      <label>
        <input
          type="radio"
          value={Player.Red}
          checked={player === Player.Red}
          onChange={(e) => setPlayer(e.target.value as Player)}
        />
        as {nameOf(Player.Red)}
      </label>
      <label>
        <input
          type="radio"
          value={Player.Blue}
          checked={player === Player.Blue}
          onChange={(e) => setPlayer(e.target.value as Player)}
        />
        as {nameOf(Player.Blue)}
      </label>
      {matchID && history.push(`/join/${matchID}/${player}`)}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateMatch;
