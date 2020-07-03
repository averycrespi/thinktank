import Board from "./components/Board";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import React from "react";
import ReactDOM from "react-dom";
import { game } from "./logic/game";

// @ts-ignore
const App = Client({ game, board: Board, multiplayer: Local() });

ReactDOM.render(
  <React.StrictMode>
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 50%" }}>
        <App playerID="0" />
      </div>
      <div style={{ flex: "1" }}>
        <App playerID="1" />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
