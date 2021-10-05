import { Client } from "boardgame.io/react";
import React from "react";
import { game } from "../../logic/game";
import Board from "../Board/Board";

const SandboxClient = Client({ game, board: Board, debug: false });

/** Renders the home page. */
const HomePage = () => <SandboxClient />;

export default HomePage;
