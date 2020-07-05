import { Link } from "react-router-dom";
import React from "react";

const Home = () => (
  <div id="welcome">
    <h1>Thinktank</h1>
    <ul>
      <li>
        <Link to="/sandbox">Sandbox</Link>
      </li>
      <li>
        <Link to="/create">Create private match</Link>
      </li>
    </ul>
  </div>
);

export default Home;
