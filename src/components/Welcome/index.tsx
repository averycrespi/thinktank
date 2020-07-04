import { Link } from "react-router-dom";
import React from "react";
import routes from "../../routes";

/** Render a welcome page. */
const Welcome = () => (
  <div id="welcome">
    <ul>
      {routes.map((r) => (
        <li>
          <Link to={r.path}>{r.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Welcome;
