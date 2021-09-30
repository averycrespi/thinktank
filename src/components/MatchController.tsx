import React, { useState, useEffect } from "react";
import { moveToken, possibleMovements } from "../logic/actions/move";
import { placeToken, possiblePlacements } from "../logic/actions/place";
import { possibleRotations, rotateToken } from "../logic/actions/rotate";
import { advanceState } from "../logic/advance";
import { Player } from "../logic/player";
import { GameState } from "../logic/state";
import { Token } from "../logic/token";
import MatchView from "./MatchView";

interface Start {
  kind: "start";
}

/** Player has selected a token; awaiting placement or rotation. */
interface TokenSelected {
  kind: "token_selected";
  token: Token;
}

/** Player has clicked a cell; awaiting movement. */
interface CellClicked {
  kind: "cell_clicked";
  index: number;
}

/** Player has placed a token; awaiting submit or undo. */
interface TokenPlaced {
  kind: "token_placed";
  token: Token;
  index: number;
}

/** Player has rotated a token; awaiting submit or undo. */
interface TokenRotated {
  kind: "token_rotated";
  afterToken: Token;
  index: number;
}

/** Player has moved a token; awaiting submit or undo. */
interface TokenMoved {
  kind: "token_moved";
  srcIndex: number;
  destIndex: number;
}

type ControllerState =
  | Start
  | TokenSelected
  | CellClicked
  | TokenPlaced
  | TokenRotated
  | TokenMoved;

interface MatchControllerProps {
  state: GameState;
  player: Player;
  isActive: boolean;
  place(token: Token, index: number): void;
  move(srcIndex: number, destIndex: number): void;
  rotate(afterToken: Token, index: number): void;
}

/** Controls a match. */
const MatchController = ({
  state,
  player,
  isActive,
  place,
  move,
  rotate,
}: MatchControllerProps) => {
  const [controllerState, setControllerState] = useState<ControllerState>({
    kind: "start",
  });
  const [highlightedIndices, setHighlightedIndices] = useState<Set<number>>(
    new Set()
  );
  const [visibleState, setVisibleState] = useState<GameState>(state);

  useEffect(() => {
    setControllerState({ kind: "start" });
    setHighlightedIndices(new Set());
    setVisibleState(state);
  }, [state, player, isActive]);

  const handleCellClick = (index: number) => {
    const cell = state.grid[index];
    let newState: GameState | null;
    switch (controllerState.kind) {
      case "start":
        if (cell && cell.owner === player) {
          setControllerState({ kind: "cell_clicked", index });
          setHighlightedIndices(possibleMovements(state, player, index));
          setVisibleState(state);
        }
        break;
      case "token_selected":
        const { token } = controllerState;
        if ((newState = placeToken(state, player, token, index))) {
          setControllerState({ kind: "token_placed", token, index });
          setHighlightedIndices(new Set());
          setVisibleState(advanceState(newState, player) || state);
        } else if ((newState = rotateToken(state, player, token, index))) {
          const afterToken = token;
          setControllerState({ kind: "token_rotated", afterToken, index });
          setHighlightedIndices(new Set());
          setVisibleState(advanceState(newState, player) || state);
        } else if (cell && cell.owner === player) {
          setControllerState({ kind: "cell_clicked", index });
          setHighlightedIndices(new Set());
          setVisibleState(state);
        }
        break;
      case "cell_clicked":
        const { index: srcIndex } = controllerState;
        if ((newState = moveToken(state, player, srcIndex, index))) {
          const destIndex = index;
          setControllerState({ kind: "token_moved", srcIndex, destIndex });
          setHighlightedIndices(new Set());
          setVisibleState(advanceState(newState, player) || state);
        }
        break;
      default:
        break;
    }
  };

  const handleTokenSelect = (token: Token) => {
    switch (controllerState.kind) {
      case "start":
      case "token_selected":
      case "cell_clicked":
        setControllerState({ kind: "token_selected", token });
        setHighlightedIndices(
          new Set([
            ...possiblePlacements(state, player, token),
            ...possibleRotations(state, player, token),
          ])
        );
        setVisibleState(state);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    switch (controllerState.kind) {
      case "token_placed":
        place(controllerState.token, controllerState.index);
        break;
      case "token_rotated":
        rotate(controllerState.afterToken, controllerState.index);
        break;
      case "token_moved":
        move(controllerState.srcIndex, controllerState.destIndex);
        break;
      default:
        break;
    }
  };

  const handleUndo = () => {
    switch (controllerState.kind) {
      case "token_placed":
      case "token_rotated":
      case "token_moved":
        setControllerState({ kind: "start" });
        setHighlightedIndices(new Set());
        setVisibleState(state);
        break;
      default:
        break;
    }
  };

  return (
    <MatchView
      state={visibleState}
      player={player}
      isActive={isActive}
      highlightedIndices={highlightedIndices}
      canSelect={
        isActive &&
        ["start", "token_selected", "cell_clicked"].includes(
          controllerState.kind
        )
      }
      canSubmitOrUndo={
        isActive &&
        ["token_placed", "token_rotated", "token_moved"].includes(
          controllerState.kind
        )
      }
      handleCellClick={(i) => handleCellClick(i)}
      handleTokenSelect={(t) => handleTokenSelect(t)}
      handleSubmit={() => handleSubmit()}
      handleUndo={() => handleUndo()}
    />
  );
};

export default MatchController;
