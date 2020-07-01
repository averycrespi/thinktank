import Board from "./components/Board";
import { Client } from "boardgame.io/react";
import React from "react";
import ReactDOM from "react-dom";
import { game } from "./logic/game";

const App = Client({ game, board: Board });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
