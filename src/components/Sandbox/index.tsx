import BackToHome from "../BackToHome";
import Board from "../Board";
import { Client } from "boardgame.io/react";
import { Prompt } from "react-router-dom";
import React from "react";
import ShowHelp from "../ShowHelp";
import { game } from "../../logic/game";

const SandboxClient = Client({ game, board: Board, debug: false });

const Sandbox = () => (
  <div>
    <div className="row flex-center">
      <div className="col no-padding">
        <SandboxClient />
        <ShowHelp />
        <BackToHome />
      </div>
    </div>
    <Prompt message="Are you sure you want to leave?" />
  </div>
);

export default Sandbox;
