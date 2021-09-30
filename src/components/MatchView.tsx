import React from "react";
import { Player } from "../logic/player";
import MatchInfo from "./MatchInfo";
import Grid from "./Grid";
import TokenSelector from "./TokenSelector";
import { Token } from "../logic/token";
import { GameState } from "../logic/state";

interface MatchViewProps {
  state: GameState;
  player: Player;
  activePlayer: Player;
  highlightedIndices: Set<number>;
  canSelect: boolean;
  canSubmit: boolean;
  canUndo: boolean;
  handleCellClick(index: number): void;
  handleTokenSelect(token: Token): void;
  handleSubmit(): void;
  handleUndo(): void;
}

/** Renders the view of a match. */
const MatchView = ({
  state,
  player,
  activePlayer,
  highlightedIndices,
  canSelect,
  canSubmit,
  canUndo,
  handleCellClick,
  handleTokenSelect,
  handleSubmit,
  handleUndo,
}: MatchViewProps) => (
  <div className="match-view">
    <div className="info-panel">
      <MatchInfo player={player} activePlayer={activePlayer} />
    </div>
    <div className="grid-panel">
      <Grid
        grid={state.grid}
        highlightedIndices={highlightedIndices}
        handleCellClick={(i) => handleCellClick(i)}
      />
    </div>
    <div className="selector-panel">
      <TokenSelector
        player={player}
        hand={state.hands[player]}
        canSelect={canSelect}
        canSubmit={canSubmit}
        canUndo={canUndo}
        handleTokenSelect={(t) => handleTokenSelect(t)}
        handleSubmit={() => handleSubmit()}
        handleUndo={() => handleUndo()}
      />
    </div>
  </div>
);

export default MatchView;
