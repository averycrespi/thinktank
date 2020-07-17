import Board from "../Board";
import { Client } from "boardgame.io/react";
import HelpButton from "../HelpButton";
import HomeButton from "../HomeButton";
import { Prompt } from "react-router-dom";
import React from "react";
import { game } from "../../logic/game";

const SandboxClient = Client({ game, board: Board, debug: false });

const SandboxPage = () => (
  <div>
    <div className="row flex-center">
      <div className="col no-padding">
        <SandboxClient />
        <HelpButton />
        <HomeButton />
      </div>
    </div>
    <Prompt message="Are you sure you want to leave?" />
  </div>
);

export default SandboxPage;
