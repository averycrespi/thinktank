import { Client } from "boardgame.io/react";
import { TicTacToe } from "./Game";

const App = Client({ game: TicTacToe });

export default App;
