import React, { useEffect, useState } from "react";
import { Visibility, createMatch } from "../../api/match";

// TODO: deduplicate serverURL
const serverURL = process.env.REACT_APP_URL ?? "http://localhost:8000";

/** Render the create match page. */
const CreateMatch = () => {
  const [matchID, setMatchID] = useState("");

  useEffect(() => {
    createMatch(serverURL, Visibility.PRIVATE)
      .then((id) => setMatchID(id))
      .catch((err) => setMatchID(err.toString()));
  }, []);

  return <p>{matchID || "Creating match..."}</p>;
};

export default CreateMatch;
