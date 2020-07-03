import { Cells, Player, Token } from "../../logic";
import React, { useState } from "react";
import { canMove, possibleMovements } from "../../logic/move";
import { canPlace, possiblePlacements } from "../../logic/place";

import Grid from "./Grid";
import TokenSelector from "./TokenSelector";

enum Action {
  None,
  Place,
  Move,
  Rotate,
}

const DEFAULT_ACTION = Action.None;
const DEFAULT_HIGHLIGHTED = new Set<number>();
const DEFAULT_TOKEN = Token.Blocker;
const DEFAULT_INDEX = -1;

interface ControllerProps {
  readonly enabled: boolean;
  readonly cells: Cells;
  readonly hand: Array<Token>;
  readonly player: Player;
  placePiece(token: Token, index: number): void;
  movePiece(srcIndex: number, destIndex: number): void;
}

/** Render the game controller. */
const Controller = ({
  enabled,
  cells,
  hand,
  player,
  placePiece,
  movePiece,
}: ControllerProps) => {
  const [action, setAction] = useState(DEFAULT_ACTION);
  const [highlighted, setHighlighted] = useState(DEFAULT_HIGHLIGHTED);
  const [activeToken, setActiveToken] = useState(DEFAULT_TOKEN);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);

  const transitions = {
    toNone: () => {
      setAction(Action.None);
      setHighlighted(DEFAULT_HIGHLIGHTED);
      setActiveToken(DEFAULT_TOKEN);
      setActiveIndex(DEFAULT_INDEX);
    },
    toPlace: (token: Token) => {
      setAction(Action.Place);
      setHighlighted(possiblePlacements(cells, hand, { player, token }));
      setActiveToken(token);
      setActiveIndex(DEFAULT_INDEX);
    },
    toMove: (index: number) => {
      setAction(Action.Move);
      setHighlighted(possibleMovements(cells, player, index));
      setActiveToken(DEFAULT_TOKEN);
      setActiveIndex(index);
    },
  };

  const onTokenSelect = (token: Token) => transitions.toPlace(token);

  const onCellClick = (index: number) => {
    const p = cells[index];
    if (index !== activeIndex && p && p.player === player) {
      transitions.toMove(index);
    } else if (
      action === Action.Place &&
      canPlace(cells, hand, { player, token: activeToken }, index)
    ) {
      placePiece(activeToken, index);
      transitions.toNone();
    } else if (
      action === Action.Move &&
      canMove(cells, player, activeIndex, index)
    ) {
      movePiece(activeIndex, index);
      transitions.toNone();
    }
  };

  return (
    <div id="controller">
      <Grid
        cells={cells}
        highlighted={highlighted}
        onCellClick={enabled ? onCellClick : (_) => {}}
      />
      {enabled && <TokenSelector hand={hand} onTokenSelect={onTokenSelect} />}
    </div>
  );
};

export default Controller;
