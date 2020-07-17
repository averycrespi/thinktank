import { Link } from "react-router-dom";
import React from "react";

const OpenHowToPlay = () => (
  <div className="row flex-center">
    <div className="col">
      <Link to="/help" className="no-underline">
        <button>How to play</button>
      </Link>
    </div>
    <div className="col">
      <p>Learn the rules!</p>
    </div>
  </div>
);

export default OpenHowToPlay;
