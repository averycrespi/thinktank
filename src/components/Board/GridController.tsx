import { Cell, Player, Token } from "../../logic";
import React, { useState } from "react";
import { canMove, possibleMovements } from "../../logic/move";
import { canPlace, possiblePlacements } from "../../logic/place";
import { canRotate, possibleRotations } from "../../logic/rotate";

import GameHistory from "./GameHistory";
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
  readonly cells: Array<Cell>;
  readonly hand: Array<Token>;
  readonly history: Array<string>;
  readonly player: Player;
  placePiece(token: Token, index: number): void;
  movePiece(srcIndex: number, destIndex: number): void;
  rotatePiece(token: Token, index: number): void;
}

/** Render a grid controller. */
const GridController = ({
  isActive,
  cells,
  hand,
  history,
  player,
  placePiece,
  movePiece,
  rotatePiece,
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
          ...possiblePlacements(cells, hand, { player, token }),
          ...possibleRotations(cells, { player, token }),
        ])
      );
      setSelectedToken(token);
      setSelectedIndex(DEFAULT_INDEX);
    },
    toMove: (index: number) => {
      setAction(Action.Move);
      setHighlighted(possibleMovements(cells, player, index));
      setSelectedToken(DEFAULT_TOKEN);
      setSelectedIndex(index);
    },
  };

  const onTokenSelect = (token: Token) => transitions.toPlaceOrRotate(token);

  const onCellClick = (index: number) => {
    const p = cells[index];
    if (
      action === Action.PlaceOrRotate &&
      canRotate(cells, { player, token: selectedToken }, index)
    ) {
      rotatePiece(selectedToken, index);
      transitions.toNone();
    } else if (index !== selectedIndex && p && p.player === player) {
      transitions.toMove(index);
    } else if (
      action === Action.PlaceOrRotate &&
      canPlace(cells, hand, { player, token: selectedToken }, index)
    ) {
      placePiece(selectedToken, index);
      transitions.toNone();
    } else if (
      action === Action.Move &&
      canMove(cells, player, selectedIndex, index)
    ) {
      movePiece(selectedIndex, index);
      transitions.toNone();
    }
  };

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          <Grid
            cells={cells}
            highlighted={highlighted}
            scale={CELL_SCALE}
            onCellClick={isActive ? onCellClick : (_) => {}}
          />
        </div>
        <div className="col no-padding">
          <div className="padding-left-large">
            <GameHistory history={history} scale={CELL_SCALE} />
          </div>
        </div>
      </div>
      <div className="row flex-center">
        <div className="col no-padding">
          {isActive && (
            <TokenSelector
              hand={hand}
              selected={selectedToken}
              onTokenSelect={onTokenSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GridController;
