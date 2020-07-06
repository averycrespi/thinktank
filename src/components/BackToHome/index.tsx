import { Link } from "react-router-dom";
import React from "react";

/** Takes the user back to the home page. */
const BackToHome = () => (
  <div className="row flex-center">
    <div className="col">
      <Link to="/" className="no-underline">
        <button>Back to home</button>
      </Link>
    </div>
  </div>
);

export default BackToHome;
