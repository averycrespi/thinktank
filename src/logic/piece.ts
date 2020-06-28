export enum Token {
  Blocker = "O",
  UpTank = "^",
  DownTank = "v",
  LeftTank = "<",
  RightTank = ">",
  PlusInfiltrator = "+",
  DiagInfiltrator = "X",
  Mine = "*",
  HomeBase = "@",
}

export interface Piece {
  token: Token;
  playerId: string;
}
