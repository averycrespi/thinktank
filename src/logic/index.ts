/** Represents a game entity. */
export enum Token {
  Blocker = "O",
  UpTank = "^",
  DownTank = "v",
  LeftTank = "<",
  RightTank = ">",
  OrthogonalInfiltrator = "+",
  DiagonalInfiltrator = "X",
  Mine = "*",
  Base = "@",
}

/** Check if a token is a tank. */
export const isTank = (token: Token): boolean => {
  switch (token) {
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return true;
    default:
      return false;
  }
};

/** Represents a player. */
export enum Player {
  Red = "0",
  Blue = "1",
}

/** Return the name of a player. */
export const nameOf = (player: Player): string => {
  switch (player) {
    case Player.Red:
      return "Red";
    case Player.Blue:
      return "Blue";
  }
};

/** Return the opponent of a player. */
export const opponentOf = (player: Player): Player => {
  switch (player) {
    case Player.Red:
      return Player.Blue;
    case Player.Blue:
      return Player.Red;
  }
};

/** Represents a token owner by a player. */
export interface Piece {
  token: Token;
  player: Player;
}

/** Represents a cell in the grid. */
export type Cell = Piece | null;

/** Represents the hand of a player. */
export type Hand = Array<Token>;

/** Create a new hand. */
export const createHand = (): Array<Token> => {
  const hand = new Array<Token>();
  hand.push(...Array(3).fill(Token.Blocker));
  hand.push(...Array(5).fill(Token.UpTank));
  hand.push(...Array(5).fill(Token.DownTank));
  hand.push(...Array(5).fill(Token.LeftTank));
  hand.push(...Array(5).fill(Token.RightTank));
  hand.push(...Array(2).fill(Token.OrthogonalInfiltrator));
  hand.push(...Array(2).fill(Token.DiagonalInfiltrator));
  hand.push(Token.Mine);
  return hand;
};

/** Add a token to a hand. */
export const addToHand = (hand: Array<Token>, token: Token) => {
  if (isTank(token)) {
    // In the context of a hand, all tanks are equivalent.
    hand.push(Token.UpTank, Token.DownTank, Token.LeftTank, Token.RightTank);
  } else {
    hand.push(token);
  }
};

/** Remove a token from a hand. */
export const removeFromHand = (hand: Array<Token>, token: Token) => {
  if (isTank(token)) {
    // In the context of a hand, all tanks are equivalent.
    hand.splice(hand.indexOf(Token.UpTank), 1);
    hand.splice(hand.indexOf(Token.DownTank), 1);
    hand.splice(hand.indexOf(Token.LeftTank), 1);
    hand.splice(hand.indexOf(Token.RightTank), 1);
  } else {
    hand.splice(hand.indexOf(token), 1);
  }
};

/** Represents the game state. Must be serializable. */
export interface G {
  cells: Array<Cell>;
  hands: { [Player.Red]: Hand; [Player.Blue]: Hand };
}

/** Represents the result of a game. */
export interface Result {
  winner: Player;
}
