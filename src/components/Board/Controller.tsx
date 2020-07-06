import { Cell, Player, Token, nameOf } from "../../logic";
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
  readonly isActive: boolean;
  readonly cells: Array<Cell>;
  readonly hand: Array<Token>;
  readonly player: Player;
  placePiece(token: Token, index: number): void;
  movePiece(srcIndex: number, destIndex: number): void;
}

/** Render a game controller. */
const Controller = ({
  isActive,
  cells,
  hand,
  player,
  placePiece,
  movePiece,
}: ControllerProps) => {
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
    toPlace: (token: Token) => {
      setAction(Action.Place);
      setHighlighted(possiblePlacements(cells, hand, { player, token }));
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

  const onTokenSelect = (token: Token) => transitions.toPlace(token);

  const onCellClick = (index: number) => {
    const p = cells[index];
    if (index !== selectedIndex && p && p.player === player) {
      transitions.toMove(index);
    } else if (
      action === Action.Place &&
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
      <p>{nameOf(player)}'s turn</p>
      <Grid
        cells={cells}
        highlighted={highlighted}
        onCellClick={isActive ? onCellClick : (_) => {}}
      />
      {isActive && <TokenSelector hand={hand} onTokenSelect={onTokenSelect} />}
    </div>
  );
};

export default Controller;
