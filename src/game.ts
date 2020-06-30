import { BLUE_HOME_CENTER, RED_HOME_CENTER } from "./logic/grid";
import { Piece, Player, SimpleToken, Token, simplify } from "./logic";

import { INVALID_MOVE } from "boardgame.io/core";
import { canMove } from "./logic/move";
import { canPlace } from "./logic/place";

const placePiece = (G: any, ctx: any, token: Token, index: number) => {
  const pieces: Map<number, Piece> = G.pieces;
  const player: Player = ctx.currentPlayer;
  const hand: Map<SimpleToken, number> = G.hands.get(player);

  if (canPlace(pieces, hand, { player, token }, index)) {
    pieces.set(index, { token, player });
    hand.set(simplify(token), hand.get(simplify(token))! - 1);
  } else {
    return INVALID_MOVE;
  }
};

const movePiece = (G: any, ctx: any, srcIndex: number, destIndex: number) => {
  const pieces: Map<number, Piece> = G.pieces;
  const player: Player = ctx.currentPlayer;

  if (canMove(pieces, player, srcIndex, destIndex)) {
    pieces.set(destIndex, pieces.get(srcIndex)!);
    pieces.delete(srcIndex);
  } else {
    return INVALID_MOVE;
  }
};

const rotatePiece = (G: any, ctx: any, token: Token, index: number) =>
  INVALID_MOVE; // TODO: implement rotatePiece

const Game = {
  setup: () => {
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

    return { pieces, hands };
  },
  moves: { placePiece, movePiece, rotatePiece },
  turn: { moveLimit: 1 },
};

export default Game;
