import React from "react";
import "./ControlsView.css";

interface ControlsViewProps {
  showPositions: boolean;
  toggleShowPositions: () => void;
}

/** Renders the controls. */
const ControlsView = ({
  showPositions,
  toggleShowPositions,
}: ControlsViewProps) => {
  return (
    <div className="controls">
      <button className="control" onClick={toggleShowPositions}>
        {showPositions ? "Hide positions" : "Show positions"}
      </button>
    </div>
  );
};

export default ControlsView;
