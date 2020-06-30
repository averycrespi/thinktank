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

export interface Piece {
  token: Token;
  player: Player;
}

export enum SimpleToken {
  Blocker = "O",
  Tank = "^",
  OrthogonalInfiltrator = "+",
  DiagonalInfiltrator = "X",
  Mine = "*",
  Base = "@",
}

/** Convert a token to a simple token. */
export const simplify = (token: Token): SimpleToken => {
  switch (token) {
    case Token.Blocker:
      return SimpleToken.Blocker;
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return SimpleToken.Tank;
    case Token.OrthogonalInfiltrator:
      return SimpleToken.OrthogonalInfiltrator;
    case Token.DiagonalInfiltrator:
      return SimpleToken.DiagonalInfiltrator;
    case Token.Mine:
      return SimpleToken.Mine;
    case Token.Base:
      return SimpleToken.Base;
  }
};
