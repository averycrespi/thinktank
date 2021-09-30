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
  isActive: boolean;
  highlightedIndices: Set<number>;
  canSelect: boolean;
  canSubmitOrUndo: boolean;
  handleCellClick(index: number): void;
  handleTokenSelect(token: Token): void;
  handleSubmit(): void;
  handleUndo(): void;
}

/** Renders the view of a match. */
const MatchView = ({
  state,
  player,
  isActive,
  highlightedIndices,
  canSelect,
  canSubmitOrUndo,
  handleCellClick,
  handleTokenSelect,
  handleSubmit,
  handleUndo,
}: MatchViewProps) => (
  <div className="match-view">
    <div className="info-panel">
      <MatchInfo player={player} isActive={isActive} />
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
        canSelect={isActive && canSelect}
        canSubmitOrUndo={isActive && canSubmitOrUndo}
        handleTokenSelect={(t) => handleTokenSelect(t)}
        handleSubmit={() => handleSubmit()}
        handleUndo={() => handleUndo()}
      />
    </div>
  </div>
);

export default MatchView;
