import React, { useState } from "react";
import { Visibility, createMatch } from "../../api/match";

import { useHistory } from "react-router-dom";
import { Player } from "../../logic/player";
import { nameOf } from "../../utils/nameOf";
import { colorClassOf } from "../../utils/colorClassOf";

interface CreateMatchProps {
  serverURL: string;
}

const CreateMatch = ({ serverURL }: CreateMatchProps) => {
  const history = useHistory();
  const [player, setPlayer] = useState(Player.One);
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
        <div className="col flex-initial">
          <button disabled={clicked} onClick={onClick}>
            Create private match
          </button>
        </div>
        <div className="col flex-initial">
          <fieldset className="form-group">
            <label className="paper-radio">
              <input
                type="radio"
                value={Player.One}
                checked={player === Player.One}
                onChange={() => setPlayer(Player.One)}
              />
              <span>
                as
                <span className={colorClassOf(Player.One)}>
                  {" " + nameOf(Player.One)}
                </span>
              </span>
            </label>
            <label className="paper-radio">
              <input
                type="radio"
                value={Player.Two}
                checked={player === Player.Two}
                onChange={() => setPlayer(Player.Two)}
              />
              <span>
                as
                <span className={colorClassOf(Player.Two)}>
                  {" " + nameOf(Player.Two)}
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
