import { Link } from "react-router-dom";
import React from "react";

const ShowHelp = () => (
  <div className="row flex-center">
    <div className="col no-padding">
      <Link
        to="/help"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        <button>How to play</button>
      </Link>
    </div>
  </div>
);

export default ShowHelp;
