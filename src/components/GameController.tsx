import React from "react";
import { Player } from "../logic/player";
import { GameState } from "../logic/state";
import Grid from "./Grid";
import TokenSelector from "./TokenSelector";

interface GameControllerProps {
  state: GameState;
  currentPlayer: Player;
}

/** Renders the game controller. */
const GameController = ({ state, currentPlayer }: GameControllerProps) => (
  <div className="game-controller">
    <div className="info-panel">
      <h1 className="thinktank">thinktank</h1>
    </div>
    <div className="grid-panel">
      <Grid cells={state.grid} handleCellClick={() => {}} />
    </div>
    <div className="control-panel">
      <TokenSelector
        currentPlayer={currentPlayer}
        hand={state.hands[currentPlayer]}
        handleTokenSelect={() => {}}
        handleSubmit={() => alert("submit")}
        handleUndo={() => alert("undo")}
      />
    </div>
  </div>
);

export default GameController;
