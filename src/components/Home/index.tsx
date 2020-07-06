import CreateMatch from "../CreateMatch";
import { Link } from "react-router-dom";
import React from "react";

interface HomeProps {
  serverURL: string;
}

/** Render the home page. */
const Home = ({ serverURL }: HomeProps) => (
  <div>
    <h1>Thinktank</h1>
    <Link to="/sandbox">
      <button>Sandbox mode</button>
    </Link>
    <CreateMatch serverURL={serverURL} />
  </div>
);

export default Home;
