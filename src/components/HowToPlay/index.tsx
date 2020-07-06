import BackToHome from "../BackToHome";
import Basics from "./Basics";
import Cheatsheet from "./Cheatsheet";
import React from "react";
import Rules from "./Rules";

/** Render the how-to-play page. */
const HowToPlay = () => (
  <div className="row flex-center">
    <div className="col-6 no-padding">
      <div style={{ textAlign: "center" }}>
        <h1>How to Play</h1>
      </div>
      <Basics />
      <Cheatsheet />
      <Rules />
      <BackToHome />
    </div>
  </div>
);

export default HowToPlay;
