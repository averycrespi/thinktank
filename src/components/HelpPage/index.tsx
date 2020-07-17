import Basics from "./Basics";
import Cheatsheet from "./Cheatsheet";
import Controls from "./Controls";
import HomeButton from "../HomeButton";
import PieceDetails from "./PieceDetails";
import React from "react";
import Rules from "./Rules";

const HelpPage = () => (
  <div className="row flex-center">
    <div className="col no-padding">
      <div style={{ textAlign: "center" }}>
        <h1>How to Play</h1>
      </div>
      <Basics />
      <Controls />
      <Cheatsheet />
      <Rules />
      <PieceDetails />
      <HomeButton />
    </div>
  </div>
);

export default HelpPage;
