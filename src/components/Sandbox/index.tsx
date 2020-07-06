import Board from "../Board";
import { Client } from "boardgame.io/react";
import React from "react";
import { game } from "../../logic/game";

const SandboxClient = Client({ game, board: Board, debug: true });

/** Render a sanbox game. */
const Sandbox = () => (
  <div>
    <SandboxClient />
  </div>
);

export default Sandbox;
