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

export enum Player {
  Red = "0",
  Blue = "1",
}

/** Return the opponent of a player. */
export const opponentOf = (player: Player): Player => {
  switch (player) {
    case Player.Red:
      return Player.Blue;
    case Player.Blue:
      return Player.Red;
  }
};

export interface Piece {
  token: Token;
  player: Player;
}

export class Hand {
  private tokens: Map<Token, number>;

  /** Create a new hand. */
  constructor() {
    this.tokens = new Map<Token, number>();
    this.tokens.set(Token.Blocker, 3);
    this.tokens.set(Token.UpTank, 5);
    this.tokens.set(Token.OrthogonalInfiltrator, 2);
    this.tokens.set(Token.DiagonalInfiltrator, 2);
    this.tokens.set(Token.Mine, 1);
  }

  /** Check if the hand contains a token. */
  has = (token: Token): boolean => !!this.tokens.get(this.canonize(token));

  /** Count the occurences of a token in the hand. */
  count = (token: Token): number => this.tokens.get(this.canonize(token)) ?? 0;

  /** Add a token to the hand. */
  add = (token: Token) => {
    const c = this.canonize(token);
    this.tokens.set(c, (this.tokens.get(c) ?? 0) + 1);
  };

  /** Remove a token from the hand. */
  remove = (token: Token): boolean => {
    const c = this.canonize(token);
    const n = this.tokens.get(c);
    if (n) {
      this.tokens.set(c, n - 1);
      return true;
    } else {
      return false;
    }
  };

  /** Convert a token to its canonical form. */
  private canonize = (token: Token): Token => {
    switch (token) {
      case Token.UpTank:
      case Token.DownTank:
      case Token.LeftTank:
      case Token.RightTank:
        return Token.UpTank;
      default:
        return token;
    }
  };
}
