import { Player, nameOf } from "../../logic";
import React, { useState } from "react";
import { Visibility, createMatch } from "../../api/match";

import { colorOf } from "../../utils/colorOf";
import { useHistory } from "react-router-dom";

interface CreateMatchProps {
  serverURL: string;
}

/** Create a private match. */
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
    <div>
      <div className="row flex-center">
        <div className="col">
          <button disabled={clicked} onClick={onClick}>
            Create private match
          </button>
        </div>
        <div className="col">
          <fieldset className="form-group">
            <label className="paper-radio">
              <input
                type="radio"
                value={Player.Red}
                checked={player === Player.Red}
                onChange={() => setPlayer(Player.Red)}
              />
              <span>
                as
                <span className={colorOf(Player.Red)}>
                  {" " + nameOf(Player.Red)}
                </span>
              </span>
            </label>
            <label className="paper-radio">
              <input
                type="radio"
                value={Player.Blue}
                checked={player === Player.Blue}
                onChange={() => setPlayer(Player.Blue)}
              />
              <span>
                as
                <span className={colorOf(Player.Blue)}>
                  {" " + nameOf(Player.Blue)}
                </span>
              </span>
            </label>
          </fieldset>
        </div>
        {/* Push history so that the back button works. */}
        {matchID && history.push(`/join/${matchID}/${player}`)}
      </div>
      {error && (
        <div className="row flex-center">
          <div className="col no-padding">
            <div className="alert alert-danger">{error}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMatch;
