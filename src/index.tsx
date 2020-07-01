import Board from "./components/Board";
import { Client } from "boardgame.io/react";
import Game from "./logic/game";
import React from "react";
import ReactDOM from "react-dom";

const App = Client({ game: Game, board: Board });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
