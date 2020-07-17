import { Link } from "react-router-dom";
import React from "react";

const HomeButton = () => (
  <div className="row flex-center">
    <div className="col no-padding">
      <Link to="/" className="no-underline">
        <button>Back to home</button>
      </Link>
    </div>
  </div>
);

export default HomeButton;
