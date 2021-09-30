import { Player } from "./player";

/** Represents a token. */
export enum Token {
  Blocker,
  UpTank,
  DownTank,
  LeftTank,
  RightTank,
  CardinalInfiltrator,
  DiagonalInfiltrator,
  Mine,
  Base,
}

/** Returns the name of a token. */
export const nameOf = (token: Token): string => {
  switch (token) {
    case Token.Blocker:
      return "Blocker";
    case Token.UpTank:
      return "Upwards Tank";
    case Token.DownTank:
      return "Downwards Tank";
    case Token.LeftTank:
      return "Leftwards Tank";
    case Token.RightTank:
      return "Rightwards Tank";
    case Token.CardinalInfiltrator:
      return "Cardinal Infiltrator";
    case Token.DiagonalInfiltrator:
      return "Diagonal Infiltrator";
    case Token.Mine:
      return "Mine";
    case Token.Base:
      return "Base";
  }
};

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

/** Check if a token is an infiltrator. */
export const isInfiltrator = (token: Token): boolean => {
  switch (token) {
    case Token.CardinalInfiltrator:
    case Token.DiagonalInfiltrator:
      return true;
    default:
      return false;
  }
};

/**
 * Represents a token that has been placed on the grid by a player.
 *
 * For clarity, we exclusively use this type to represent tokens that have actually been placed.
 */
export interface PlacedToken {
  owner: Player;
  token: Token;
}

/**
 * Represents a token that is held in a player's hand.
 *
 * When considering hands, we do not distinguish between the different types of tank.
 */
export enum HeldToken {
  Blocker,
  Tank,
  CardinalInfiltrator,
  DiagonalInfiltrator,
  Mine,
  Base,
}

/** Convert a token to a held token. */
export const toHeld = (token: Token): HeldToken => {
  switch (token) {
    case Token.Blocker:
      return HeldToken.Blocker;
    case Token.UpTank:
    case Token.DownTank:
    case Token.LeftTank:
    case Token.RightTank:
      return HeldToken.Tank;
    case Token.CardinalInfiltrator:
      return HeldToken.CardinalInfiltrator;
    case Token.DiagonalInfiltrator:
      return HeldToken.DiagonalInfiltrator;
    case Token.Mine:
      return HeldToken.Mine;
    case Token.Base:
      return HeldToken.Base;
  }
};
