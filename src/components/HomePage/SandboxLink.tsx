import { Link } from "react-router-dom";
import React from "react";

const SandboxLink = () => (
  <div className="row flex-center">
    <div className="col flex-initial">
      <Link to="/sandbox" className="no-underline">
        <button>Sandbox mode</button>
      </Link>
    </div>
    <div className="col flex-initial">
      <p>Experiment with the game!</p>
    </div>
  </div>
);

export default SandboxLink;
