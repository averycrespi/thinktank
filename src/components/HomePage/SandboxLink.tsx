import { Link } from "react-router-dom";
import React from "react";

const SandboxLink = () => (
  <div className="row flex-center">
    <div className="col">
      <Link to="/sandbox" className="no-underline">
        <button>Sandbox mode</button>
      </Link>
    </div>
    <div className="col">
      <p>Experiment with the game!</p>
    </div>
  </div>
);

export default SandboxLink;
