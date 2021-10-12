import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useSwipeable } from "react-swipeable";
import { Player } from "../../logic/player";
import { GameState } from "../../logic/state";
import { Token } from "../../logic/token";
import ContextView from "../ContextView/ContextView";
import GridView from "../GridView/GridView";
import TokenSelector from "../TokenSelector/TokenSelector";
import "./MatchView.css";

const getContextSidebar = () => document.getElementById("context-sidebar");

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
  showPositions: boolean;
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
  showPositions,
}: MatchViewProps) => {
  const toggleContextSidebar = () =>
    getContextSidebar()?.classList.toggle("open");

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => getContextSidebar()?.classList.add("open"),
    onSwipedLeft: () => getContextSidebar()?.classList.remove("open"),
  });

  const isWideScreen = useMediaQuery({ query: "(min-aspect-ratio: 3/2)" });

  return (
    <div className="match-view" {...swipeHandlers}>
      <div id="context-sidebar" className={isWideScreen ? "open" : ""}>
        <ContextView player={player} isActive={isActive} winner={winner} />
      </div>
      <button
        className="context-sidebar-toggle"
        title="Toggle context sidebar"
        onClick={() => toggleContextSidebar()}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="match-view-content">
        <GridView
          grid={state.grid}
          highlightedIndices={highlightedIndices}
          handleCellClick={(i) => handleCellClick(i)}
          showPositions={showPositions}
        />
        <TokenSelector
          player={player}
          isActive={isActive}
          hand={state.hands[player]}
          canSelectToken={canSelectToken}
          canSubmitOrUndo={canSubmitOrUndo}
          handleTokenSelect={(t) => handleTokenSelect(t)}
          handleSubmit={() => handleSubmit()}
          handleUndo={() => handleUndo()}
        />
      </div>
    </div>
  );
};

export default MatchView;
