import Board from "./Board";
import { Client } from "boardgame.io/react";
import Game from "./Game";

const App = Client({ game: Game, board: Board });

export default App;
