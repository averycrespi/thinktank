import React, { useEffect, useState } from "react";
import { moveToken, possibleMovementsFrom } from "../../logic/actions/move";
import { placeToken, possiblePlacementFor } from "../../logic/actions/place";
import { possibleRotationsInto, rotateToken } from "../../logic/actions/rotate";
import { Player } from "../../logic/player";
import { GameState } from "../../logic/state";
import { Token } from "../../logic/token";
import MatchView from "../MatchView/MatchView";
import { ControllerState } from "./controllerState";

interface MatchControllerProps {
  state: GameState;
  player: Player;
  isActive: boolean;
  winner: Player | null;
  moves: {
    placeToken: (token: Token, index: number) => void;
    moveToken: (srcIndex: number, destIndex: number) => void;
    rotateToken: (afterToken: Token, index: number) => void;
  };
}

/** Controls a match. */
const MatchController = ({
  state,
  player,
  isActive,
  winner,
  moves,
}: MatchControllerProps) => {
  const [controllerState, setControllerState] = useState<ControllerState>({
    tag: "initial",
  });
  const [highlightedIndices, setHighlightedIndices] = useState<Set<number>>(
    new Set()
  );
  const [projectedState, setProjectedState] = useState<GameState>(state);
  const [showPositions, setShowPositions] = useState<boolean>(false);

  // Defines the transitions between the controller states.
  const actions = {
    reset: (): boolean => {
      setControllerState({ tag: "initial" });
      setHighlightedIndices(new Set());
      setProjectedState(state);
      return true;
    },

    selectToken: (token: Token): boolean => {
      setControllerState({ tag: "token_selected", token });
      setHighlightedIndices(
        new Set([
          ...possiblePlacementFor(state, player, token),
          ...possibleRotationsInto(state, player, token),
        ])
      );
      setProjectedState(state);
      return true;
    },

    clickCell: (index: number): boolean => {
      const cell = state.grid[index];
      if (cell && cell.owner === player) {
        setControllerState({ tag: "cell_clicked", index });
        setHighlightedIndices(possibleMovementsFrom(state, player, index));
        setProjectedState(state);
        return true;
      }
      return false;
    },

    placeToken: (token: Token, index: number): boolean => {
      const afterPlacement = placeToken(state, player, token, index);
      if (afterPlacement) {
        setControllerState({ tag: "token_placed", token, index });
        setHighlightedIndices(new Set());
        setProjectedState(afterPlacement);
        return true;
      }
      return false;
    },

    moveToken: (srcIndex: number, destIndex: number): boolean => {
      const afterMovement = moveToken(state, player, srcIndex, destIndex);
      if (afterMovement) {
        setControllerState({ tag: "token_moved", srcIndex, destIndex });
        setHighlightedIndices(new Set());
        setProjectedState(afterMovement);
        return true;
      }
      return false;
    },

    rotateToken: (afterToken: Token, index: number): boolean => {
      const afterRotation = rotateToken(state, player, afterToken, index);
      if (afterRotation) {
        setControllerState({ tag: "token_rotated", afterToken, index });
        setHighlightedIndices(new Set());
        setProjectedState(afterRotation);
        return true;
      }
      return false;
    },
  };

  // Reset the controller state whenever the game state is updated.
  useEffect(
    () => {
      actions.reset();
    },
    // This is safe because actions only depends on state and player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, player]
  );

  const handleCellClick = (index: number): boolean => {
    switch (controllerState.tag) {
      case "initial":
        return actions.clickCell(index);
      case "token_selected":
        return (
          actions.placeToken(controllerState.token, index) ||
          actions.rotateToken(controllerState.token, index) ||
          actions.clickCell(index)
        );
      case "cell_clicked":
        return actions.moveToken(controllerState.index, index);
      default:
        return false;
    }
  };

  const canSelectToken = () => {
    switch (controllerState.tag) {
      case "initial":
      case "token_selected":
      case "cell_clicked":
        return isActive;
      default:
        return false;
    }
  };

  const handleTokenSelect = (token: Token): boolean => {
    switch (controllerState.tag) {
      case "initial":
      case "token_selected":
      case "cell_clicked":
        return actions.selectToken(token);
      default:
        return false;
    }
  };

  const canSubmitOrUndo = (): boolean => {
    switch (controllerState.tag) {
      case "token_placed":
      case "token_rotated":
      case "token_moved":
        return isActive;
      default:
        return false;
    }
  };

  const handleSubmit = (): boolean => {
    switch (controllerState.tag) {
      case "token_placed":
        moves.placeToken(controllerState.token, controllerState.index);
        return true;
      case "token_rotated":
        moves.rotateToken(controllerState.afterToken, controllerState.index);
        return true;
      case "token_moved":
        moves.moveToken(controllerState.srcIndex, controllerState.destIndex);
        return true;
      default:
        return false;
    }
  };

  const handleUndo = (): boolean => {
    switch (controllerState.tag) {
      case "token_placed":
      case "token_rotated":
      case "token_moved":
        return actions.reset();
      default:
        return false;
    }
  };

  return (
    <MatchView
      state={projectedState}
      player={player}
      isActive={isActive}
      winner={winner}
      highlightedIndices={highlightedIndices}
      handleCellClick={(i) => handleCellClick(i)}
      canSelectToken={canSelectToken()}
      handleTokenSelect={(t) => handleTokenSelect(t)}
      canSubmitOrUndo={canSubmitOrUndo()}
      handleSubmit={() => handleSubmit()}
      handleUndo={() => handleUndo()}
      showPositions={showPositions}
      toggleShowPositions={() => setShowPositions(!showPositions)}
    />
  );
};

export default MatchController;
