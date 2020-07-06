import CreateMatch from "./CreateMatch";
import OpenHowToPlay from "./OpenHowToPlay";
import OpenSandbox from "./OpenSandbox";
import React from "react";

interface HomeProps {
  serverURL: string;
}

/** Render the home page. */
const Home = ({ serverURL }: HomeProps) => (
  <div className="row flex-center">
    <div className="col no-padding">
      <div style={{ textAlign: "center" }}>
        <h1>Thinktank</h1>
      </div>
      <OpenHowToPlay />
      <OpenSandbox />
      <CreateMatch serverURL={serverURL} />
    </div>
  </div>
);

export default Home;
