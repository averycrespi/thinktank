import { Link } from "react-router-dom";
import React from "react";

const HelpLink = () => (
  <div className="row flex-center">
    <div className="col flex-initial">
      <Link to="/help" className="no-underline">
        <button>How to play</button>
      </Link>
    </div>
    <div className="col flex-initial">
      <p>Learn the rules!</p>
    </div>
  </div>
);

export default HelpLink;
