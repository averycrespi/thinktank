import { Coords, isBlueHome, isBlueSafe, isRedHome, isRedSafe } from "./grid";

import { Token } from "./token";

export const canRedPlace = (coords: Coords, token: Token) =>
  isRedSafe(coords) && !isRedHome(coords);

export const canBluePlace = (coords: Coords, token: Token) =>
  isBlueSafe(coords) && !isBlueHome(coords);
