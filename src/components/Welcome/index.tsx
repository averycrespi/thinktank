import { Link } from "react-router-dom";
import React from "react";
import routes from "../../routes";

/** Render a welcome page. */
const Welcome = () => (
  <div id="welcome">
    <ul>
      <li>
        <Link to={routes.sandbox.path}>{routes.sandbox.name}</Link>
      </li>
      <li>
        <Link to={routes.local.path}>{routes.local.name}</Link>
      </li>
    </ul>
  </div>
);

export default Welcome;
