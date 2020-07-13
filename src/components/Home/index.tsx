import CreateMatch from "./CreateMatch";
import Credits from "./Credits";
import OpenHowToPlay from "./OpenHowToPlay";
import OpenSandbox from "./OpenSandbox";
import React from "react";

interface HomeProps {
  serverURL: string;
}

const Home = ({ serverURL }: HomeProps) => (
  <div className="row flex-center">
    <div className="col no-padding">
      <div style={{ textAlign: "center" }}>
        <h1>Thinktank</h1>
      </div>
      <OpenHowToPlay />
      <OpenSandbox />
      <CreateMatch serverURL={serverURL} />
      <Credits />
    </div>
  </div>
);

export default Home;
