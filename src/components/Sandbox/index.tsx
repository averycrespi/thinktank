import BackToHome from "../BackToHome";
import Board from "../Board";
import { Client } from "boardgame.io/react";
import React from "react";
import { game } from "../../logic/game";

const SandboxClient = Client({ game, board: Board, debug: false });

/** Render a sandbox game. */
const Sandbox = () => (
  <div>
    <div className="row flex-center">
      <div className="col no-padding">
        <SandboxClient />
      </div>
    </div>
    <div className="row flex-center">
      <div className="col no-padding">
        <BackToHome />
      </div>
    </div>
  </div>
);

export default Sandbox;
