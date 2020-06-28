import Board from "./components/Board";
import { Client } from "boardgame.io/react";
import Game from "./components/Game";

const App = Client({ game: Game, board: Board });

export default App;
