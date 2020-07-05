import { Link } from "react-router-dom";
import React from "react";

/** Render the home page. */
const Home = () => (
  <div id="welcome">
    <h1>Thinktank</h1>
    <ul>
      <li>
        <Link to="/sandbox">Sandbox</Link>
      </li>
      <li>
        <Link to="/local">Local Multiplayer</Link>
      </li>
      <li>
        <Link to="/create">Create Match</Link>
      </li>
    </ul>
  </div>
);

export default Home;
