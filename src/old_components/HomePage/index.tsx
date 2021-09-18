import CreateMatch from "./CreateMatch";
import Credits from "./Credits";
import HelpLink from "./HelpLink";
import React from "react";
import SandboxLink from "./SandboxLink";

interface HomePageProps {
  serverURL: string;
}

const HomePage = ({ serverURL }: HomePageProps) => (
  <div className="row flex-center">
    <div className="col no-padding">
      <div style={{ textAlign: "center" }}>
        <h1>Thinktank</h1>
      </div>
      <HelpLink />
      <SandboxLink />
      <CreateMatch serverURL={serverURL} />
      <Credits />
    </div>
  </div>
);

export default HomePage;
