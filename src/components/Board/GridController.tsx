import React, { useState } from "react";
import { canMoveToken, possibleMovements } from "../../logic/actions/move";
import { canPlaceToken, possiblePlacements } from "../../logic/actions/place";
import { canRotateToken, possibleRotations } from "../../logic/actions/rotate";
import { Player } from "../../logic/player";
import { GameState } from "../../logic/state";
import { Token } from "../../logic/token";

import Grid from "./Grid";
import TokenSelector from "./TokenSelector";

const CELL_SCALE = 2;

enum Action {
  None,
  PlaceOrRotate,
  Move,
}

const DEFAULT_ACTION = Action.None;
const DEFAULT_HIGHLIGHTED = new Set<number>();
const DEFAULT_TOKEN = Token.Base;
const DEFAULT_INDEX = -1;

interface GridControllerProps {
  readonly isActive: boolean;
  readonly state: GameState;
  readonly player: Player;
  placeToken(token: Token, index: number): void;
  moveToken(srcIndex: number, destIndex: number): void;
  rotateToken(afterToken: Token, index: number): void;
}

const GridController = ({
  isActive,
  state,
  player,
  placeToken,
  moveToken,
  rotateToken,
}: GridControllerProps) => {
  const [action, setAction] = useState(DEFAULT_ACTION);
  const [highlighted, setHighlighted] = useState(DEFAULT_HIGHLIGHTED);
  const [selectedToken, setSelectedToken] = useState(DEFAULT_TOKEN);
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_INDEX);

  const transitions = {
    toNone: () => {
      setAction(Action.None);
      setHighlighted(DEFAULT_HIGHLIGHTED);
      setSelectedToken(DEFAULT_TOKEN);
      setSelectedIndex(DEFAULT_INDEX);
    },
    toPlaceOrRotate: (token: Token) => {
      setAction(Action.PlaceOrRotate);
      setHighlighted(
        new Set([
          ...possiblePlacements(state, player, token),
          ...possibleRotations(state, player, token),
        ])
      );
      setSelectedToken(token);
      setSelectedIndex(DEFAULT_INDEX);
    },
    toMove: (index: number) => {
      setAction(Action.Move);
      setHighlighted(possibleMovements(state, player, index));
      setSelectedToken(DEFAULT_TOKEN);
      setSelectedIndex(index);
    },
  };

  const onTokenSelect = (token: Token) => transitions.toPlaceOrRotate(token);

  const onCellClick = (index: number) => {
    const clickedToken = state.grid[index];
    if (
      action === Action.PlaceOrRotate &&
      canRotateToken(state, player, selectedToken, index)
    ) {
      rotateToken(selectedToken, index);
      transitions.toNone();
    } else if (
      index !== selectedIndex &&
      clickedToken &&
      clickedToken.owner === player
    ) {
      transitions.toMove(index);
    } else if (
      action === Action.PlaceOrRotate &&
      canPlaceToken(state, player, selectedToken, index)
    ) {
      placeToken(selectedToken, index);
      transitions.toNone();
    } else if (
      action === Action.Move &&
      canMoveToken(state, player, selectedIndex, index)
    ) {
      moveToken(selectedIndex, index);
      transitions.toNone();
    }
  };

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          <Grid
            grid={state.grid}
            highlighted={highlighted}
            scale={CELL_SCALE}
            onCellClick={isActive ? onCellClick : (_) => {}}
          />
        </div>
      </div>
      <div className="row flex-center">
        <div className="col no-padding">
          <TokenSelector
            isActive={isActive}
            player={player}
            hand={state.hands[player]}
            selected={selectedToken}
            onTokenSelect={onTokenSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default GridController;
