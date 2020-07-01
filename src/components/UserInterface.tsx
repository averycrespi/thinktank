import { Piece, Player, SimpleToken, Token } from "../logic";
import React, { useState } from "react";
import { canMove, possibleMovements } from "../logic/move";
import { canPlace, possiblePlacements } from "../logic/place";

import Grid from "./Grid";
import Hand from "./Hand";
import Selector from "./Selector";

enum State {
  None,
  Place,
  Move,
  Rotate,
}

const DEFAULT_STATE = State.None;
const DEFAULT_HIGHLIGHTED = new Set<number>();
const DEFAULT_TOKEN = Token.Blocker;
const DEFAULT_INDEX = -1;

interface UserInterfaceProps {
  pieces: Map<number, Piece>;
  hand: Map<SimpleToken, number>;
  player: Player;
  moves: any;
}

const UserInterface = ({ pieces, hand, player, moves }: UserInterfaceProps) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [highlighted, setHighlighted] = useState(DEFAULT_HIGHLIGHTED);
  const [activeToken, setActiveToken] = useState(DEFAULT_TOKEN);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);

  const transitions = {
    toNone: () => {
      setState(State.None);
      setHighlighted(DEFAULT_HIGHLIGHTED);
      setActiveToken(DEFAULT_TOKEN);
      setActiveIndex(DEFAULT_INDEX);
    },
    toPlace: (token: Token) => {
      setState(State.Place);
      setHighlighted(possiblePlacements(pieces, hand, { player, token }));
      setActiveToken(token);
      setActiveIndex(DEFAULT_INDEX);
    },
    toMove: (index: number) => {
      setState(State.Move);
      setHighlighted(possibleMovements(pieces, player, index));
      setActiveToken(DEFAULT_TOKEN);
      setActiveIndex(index);
    },
  };

  const onTokenSelect = (token: Token) => transitions.toPlace(token);

  const onCellClick = (index: number) => {
    const p = pieces.get(index);
    if (index !== activeIndex && p && p.player === player) {
      transitions.toMove(index);
    } else if (
      state === State.Place &&
      canPlace(pieces, hand, { player, token: activeToken }, index)
    ) {
      moves.placePiece(activeToken, index);
      transitions.toNone();
    } else if (
      state === State.Move &&
      canMove(pieces, player, activeIndex, index)
    ) {
      moves.movePiece(activeIndex, index);
      transitions.toNone();
    }
  };

  return (
    <div id="interface">
      <Hand hand={hand} player={player} />
      <p>{"State: " + State[state]}</p>
      <Grid
        pieces={pieces}
        highlighted={highlighted}
        onCellClick={onCellClick}
      />
      <Selector hand={hand} onTokenSelect={onTokenSelect} />
    </div>
  );
};

export default UserInterface;
