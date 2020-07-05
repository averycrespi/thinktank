import React, { useEffect, useState } from "react";
import { Visibility, createMatch } from "../../api/match";

interface CreateMatchProps {
  serverURL: string;
}

const CreateMatch = ({ serverURL }: CreateMatchProps) => {
  const [matchID, setMatchID] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    createMatch(serverURL, Visibility.PRIVATE)
      .then((id) => setMatchID(id))
      .catch((err) => setError(err.toString()));
  }, [serverURL]);

  return <p>{matchID || error || "Creating match..."}</p>;
};

export default CreateMatch;
