import React from "react";
import { Player } from "../../logic/player";
import { GameState } from "../../logic/state";
import Grid from "../Grid";
import TokenSelector from "../TokenSelector";

interface GameControllerProps {
  state: GameState;
}

/** Renders the game controller. */
const GameController = ({ state }: GameControllerProps) => (
  <div className="game-controller">
    <div className="info-panel">
      <h1>Thinktank</h1>
    </div>
    <div className="grid-panel">
      <Grid cells={state.grid} handleCellClick={() => {}} />
    </div>
    <div className="control-panel">
      <TokenSelector
        player={Player.One}
        hand={state.hands[Player.One]}
        handleTokenSelect={() => {}}
        handleSubmit={() => {}}
        handleUndo={() => {}}
      />
    </div>
  </div>
);

export default GameController;
