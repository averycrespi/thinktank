import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSwipeable } from "react-swipeable";
import { Player } from "../../logic/player";
import { GameState } from "../../logic/state";
import { Token } from "../../logic/token";
import Grid from "../Grid/Grid";
import MatchInfo from "../MatchInfo/MatchInfo";
import TokenSelector from "../TokenSelector/TokenSelector";
import "./MatchView.css";

const canControlSidebar = () =>
  !window.matchMedia("(min-width: 1200px)").matches;

const toggleSidebar = () =>
  canControlSidebar() &&
  document.getElementById("match-view-sidebar")?.classList.toggle("open");

interface MatchViewProps {
  state: GameState;
  player: Player;
  isActive: boolean;
  winner: Player | null;
  highlightedIndices: Set<number>;
  handleCellClick(index: number): void;
  canSelectToken: boolean;
  handleTokenSelect(token: Token): void;
  canSubmitOrUndo: boolean;
  handleSubmit(): void;
  handleUndo(): void;
}

/** Renders the view of a match. */
const MatchView = ({
  state,
  player,
  isActive,
  winner,
  highlightedIndices,
  handleCellClick,
  canSelectToken,
  handleTokenSelect,
  canSubmitOrUndo,
  handleSubmit,
  handleUndo,
}: MatchViewProps) => {
  const handlers = useSwipeable({
    onSwipedRight: () =>
      canControlSidebar() &&
      document.getElementById("match-view-sidebar")?.classList.add("open"),
    onSwipedLeft: () =>
      canControlSidebar() &&
      document.getElementById("match-view-sidebar")?.classList.remove("open"),
  });

  return (
    <div className="match-view" {...handlers}>
      <div id="match-view-sidebar">
        <MatchInfo player={player} isActive={isActive} winner={winner} />
      </div>
      <button
        className="match-view-sidebar-toggle"
        title="Toggle sidebar"
        onClick={() => toggleSidebar()}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="match-view-content">
        <div className="info-panel">
          <MatchInfo player={player} isActive={isActive} winner={winner} />
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
            canSelectToken={isActive && canSelectToken}
            canSubmitOrUndo={isActive && canSubmitOrUndo}
            handleTokenSelect={(t) => handleTokenSelect(t)}
            handleSubmit={() => handleSubmit()}
            handleUndo={() => handleUndo()}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchView;
