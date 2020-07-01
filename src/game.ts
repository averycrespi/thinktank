import { BLUE_HOME_CENTER, RED_HOME_CENTER } from "./logic/grid";
import { Piece, Player, SimpleToken, Token, simplify } from "./logic";
import {
  canBeExploded,
  canBeInfiltrated,
  canBeShot,
  canExplodeSelf,
} from "./logic/danger";

import { INVALID_MOVE } from "boardgame.io/core";
import { canMove } from "./logic/move";
import { canPlace } from "./logic/place";

const setup = () => {
  let pieces = new Map<number, Piece>();
  pieces.set(RED_HOME_CENTER, { token: Token.Base, player: Player.Red });
  pieces.set(BLUE_HOME_CENTER, { token: Token.Base, player: Player.Blue });
  let hands = new Map<Player, Map<SimpleToken, number>>();
  hands.set(Player.Red, new Map<SimpleToken, number>());
  hands.set(Player.Blue, new Map<SimpleToken, number>());
  for (const hand of hands.values()) {
    hand.set(SimpleToken.Blocker, 3);
    hand.set(SimpleToken.Tank, 5);
    hand.set(SimpleToken.OrthogonalInfiltrator, 2);
    hand.set(SimpleToken.DiagonalInfiltrator, 2);
    hand.set(SimpleToken.Mine, 1);
  }
  let history = new Array<string>();
  return { pieces, hands, history };
};

const placePiece = (G: any, ctx: any, token: Token, index: number) => {
  const pieces: Map<number, Piece> = G.pieces;
  const player: Player = ctx.currentPlayer;
  const history: Array<string> = G.history;
  const hand: Map<SimpleToken, number> = G.hands.get(player);
  if (canPlace(pieces, hand, { player, token }, index)) {
    pieces.set(index, { token, player });
    const simple = simplify(token);
    hand.set(simple, hand.get(simple)! - 1);
    history.push(player + " placed " + token + " at " + index);
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: any, ctx: any, srcIndex: number, destIndex: number) => {
  const pieces: Map<number, Piece> = G.pieces;
  const history: Array<string> = G.history;
  const player: Player = ctx.currentPlayer;
  if (canMove(pieces, player, srcIndex, destIndex)) {
    pieces.set(destIndex, pieces.get(srcIndex)!);
    pieces.delete(srcIndex);
    history.push(player + " moved " + srcIndex + " to " + destIndex);
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: any, ctx: any, token: Token, index: number) =>
  INVALID_MOVE; // TODO: implement rotatePiece

const onTurnEnd = (G: any, ctx: any) => {
  const pieces: Map<number, Piece> = G.pieces;
  const hands: Map<Player, Map<SimpleToken, number>> = G.hands;
  const history: Array<string> = G.history;
  const player: Player = ctx.currentPlayer;
  // First pass: capture infiltrated pieces and track exploding mines.
  const exploding = new Set<number>();
  for (const [index, piece] of pieces.entries()) {
    if (canBeInfiltrated(pieces, index)) {
      const opponent = piece.player === Player.Red ? Player.Blue : Player.Red;
      piece.player = opponent;
      history.push(player + " captured " + piece.token + " at " + index);
    } else if (canExplodeSelf(pieces, index)) {
      exploding.add(index);
    }
  }
  // Second pass: remove shot, exploded, and exploding pieces.
  for (const [index, piece] of pieces.entries()) {
    if (
      canBeShot(pieces, index) ||
      canBeExploded(pieces, index) ||
      exploding.has(index)
    ) {
      pieces.delete(index);
      const hand = hands.get(piece.player)!;
      const simple = simplify(piece.token);
      hand.set(simple, hand.get(simple)! + 1);
      history.push(player + " destroyed " + piece.token + " at " + index);
    }
  }
};

const Game = {
  setup: setup,
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1, onEnd: onTurnEnd },
};

export default Game;
