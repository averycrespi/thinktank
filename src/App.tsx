import Board from "./components/Board";
import { Client } from "boardgame.io/react";
import Game from "./game";

const App = Client({ game: Game, board: Board });

export default App;
