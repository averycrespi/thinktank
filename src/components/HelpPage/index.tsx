import Basics from "./Basics";
import Cheatsheet from "./Cheatsheet";
import HomeButton from "../HomeButton";
import React from "react";
import Rules from "./Rules";

const HelpPage = () => (
  <div className="row flex-center">
    <div className="col no-padding">
      <Basics />
      <Cheatsheet />
      <Rules />
      <HomeButton />
    </div>
  </div>
);

export default HelpPage;
