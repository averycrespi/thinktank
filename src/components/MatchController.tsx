import React, { useState, useEffect } from "react";
import { Action, applyAction } from "../logic/actions";
import { canMoveToken, possibleMovements } from "../logic/actions/move";
import { canPlaceToken, possiblePlacements } from "../logic/actions/place";
import { canRotateToken, possibleRotations } from "../logic/actions/rotate";
import { Player } from "../logic/player";
import { GameState } from "../logic/state";
import { nameOf, Token } from "../logic/token";
import MatchView from "./MatchView";

/**
 * Description of the controller state machine:
 *
 * Ready:
 *  Select token from hand -> PlaceOrRotateToken
 *  Click cell on grid -> MoveToken
 * PlaceOrRotateToken:
 *  Select token from hand -> PlaceOrRotateToken
 *  Click cell on grid -> SubmitOrUndo
 * MoveToken:
 *  Select token from hand -> PlaceOrRotateToken
 *  Click cell on grid -> SubmitOrUndo
 * SubmitOrUndo:
 *  Submit action -> Ready
 *  Undo action -> Ready
 */
enum ControllerState {
  Ready, // Player is ready to place, move, or rotate a token
  PlaceOrRotateToken, // Player has selected a token to place or rotate
  MoveToken, // Player has selected a token to move
  SubmitOrUndo, // Player has taken an action, awaiting submit or undo
}

interface MatchControllerProps {
  state: GameState;
  player: Player;
  activePlayer: Player;
  place(token: Token, index: number): void;
  move(srcIndex: number, destIndex: number): void;
  rotate(afterToken: Token, index: number): void;
}

/** Controls a match. */
const MatchController = ({
  state,
  player,
  activePlayer,
  place,
  move,
  rotate,
}: MatchControllerProps) => {
  const [controllerState, setControllerState] = useState(ControllerState.Ready);
  const [visibleState, setVisibleState] = useState(state);
  const [highlightedIndices, setHighlightedIndices] =
    useState<Set<number> | null>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [action, setAction] = useState<Action | null>();

  /** Defines transitions between the controller states. */
  const transitions = {
    toReady: () => {
      console.log("Transitioning to state: Ready");
      setControllerState(ControllerState.Ready);
      setVisibleState(state);
      setHighlightedIndices(null);
      setSelectedIndex(null);
      setSelectedToken(null);
      setAction(null);
    },

    toPlaceOrRotateToken: (token: Token) => {
      console.log(
        `Transitioning to state: PlaceOrRotateToken with token: ${nameOf(
          token
        )}`
      );
      setControllerState(ControllerState.PlaceOrRotateToken);
      setVisibleState(state);
      setHighlightedIndices(
        new Set([
          ...possiblePlacements(state, player, token),
          ...possibleRotations(state, player, token),
        ])
      );
      setSelectedIndex(null);
      setSelectedToken(token);
      setAction(null);
    },

    toMoveToken: (index: number) => {
      console.log(`Transitioning to state: MoveToken with index: ${index}`);
      setControllerState(ControllerState.MoveToken);
      setVisibleState(state);
      setHighlightedIndices(possibleMovements(state, player, index));
      setSelectedIndex(index);
      setSelectedToken(null);
      setAction(null);
    },

    toSubmitOrUndo: (action: Action) => {
      console.log(
        `Transitioning to state: SubmitOrUndo with action: ${JSON.stringify(
          action
        )}`
      );
      const newState = applyAction(state, player, action);
      if (newState) {
        setControllerState(ControllerState.SubmitOrUndo);
        setVisibleState(newState);
        setHighlightedIndices(null);
        setSelectedIndex(null);
        setSelectedToken(null);
        setAction(action);
      } else {
        console.warn("Failed to apply action");
        transitions.toReady();
      }
    },
  };

  // Reset to the Ready controller state when game state is updated
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => transitions.toReady(), [state]);

  const handleCellClick = (index: number) => {
    const cell = state.grid[index];
    switch (controllerState) {
      case ControllerState.Ready:
        if (cell && cell.owner === player) {
          transitions.toMoveToken(index);
        }
        break;
      case ControllerState.PlaceOrRotateToken:
        if (selectedToken !== null) {
          if (canPlaceToken(state, player, selectedToken, index)) {
            transitions.toSubmitOrUndo({
              kind: "place",
              token: selectedToken,
              index,
            });
          } else if (canRotateToken(state, player, selectedToken, index)) {
            transitions.toSubmitOrUndo({
              kind: "rotate",
              afterToken: selectedToken,
              index,
            });
          } else if (cell && cell.owner === player) {
            transitions.toMoveToken(index);
          }
        } else {
          console.warn("Invariant broken: selectedToken was not set");
          transitions.toReady();
        }
        break;
      case ControllerState.MoveToken:
        if (selectedIndex !== null) {
          if (canMoveToken(state, player, selectedIndex, index)) {
            transitions.toSubmitOrUndo({
              kind: "move",
              srcIndex: selectedIndex,
              destIndex: index,
            });
          }
        } else {
          console.warn("Invariant broken: selectedIndex was not set");
          transitions.toReady();
        }
        break;
      case ControllerState.SubmitOrUndo:
        break;
    }
  };

  const handleTokenSelect = (token: Token) => {
    switch (controllerState) {
      case ControllerState.Ready:
      case ControllerState.PlaceOrRotateToken:
      case ControllerState.MoveToken:
        transitions.toPlaceOrRotateToken(token);
        break;
      case ControllerState.SubmitOrUndo:
        break;
    }
  };

  const handleSubmit = () => {
    switch (controllerState) {
      case ControllerState.Ready:
      case ControllerState.PlaceOrRotateToken:
      case ControllerState.MoveToken:
        break;
      case ControllerState.SubmitOrUndo:
        if (action) {
          switch (action.kind) {
            case "place":
              place(action.token, action.index);
              break;
            case "rotate":
              rotate(action.afterToken, action.index);
              break;
            case "move":
              move(action.srcIndex, action.destIndex);
              break;
          }
        } else {
          console.warn("Invariant broken: action was not set");
          transitions.toReady();
        }
        break;
    }
  };

  const handleUndo = () => {
    switch (controllerState) {
      case ControllerState.Ready:
      case ControllerState.PlaceOrRotateToken:
      case ControllerState.MoveToken:
        break;
      case ControllerState.SubmitOrUndo:
        transitions.toReady();
        break;
    }
  };

  return (
    <MatchView
      state={visibleState}
      player={player}
      activePlayer={activePlayer}
      highlightedIndices={highlightedIndices || new Set()}
      canSelect={controllerState !== ControllerState.SubmitOrUndo}
      canSubmit={controllerState === ControllerState.SubmitOrUndo}
      canUndo={controllerState === ControllerState.SubmitOrUndo}
      handleCellClick={(i) => handleCellClick(i)}
      handleTokenSelect={(t) => handleTokenSelect(t)}
      handleSubmit={() => handleSubmit()}
      handleUndo={() => handleUndo()}
    />
  );
};

export default MatchController;
