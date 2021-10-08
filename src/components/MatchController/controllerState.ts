import { Token } from "../../logic/token";

type TaggedState<T extends string> = { tag: T };

export type Initial = TaggedState<"initial">;

export type TokenSelected = TaggedState<"token_selected"> & { token: Token };

export type CellClicked = TaggedState<"cell_clicked"> & { index: number };

export type TokenPlaced = TaggedState<"token_placed"> & {
  token: Token;
  index: number;
};

export type TokenRotated = TaggedState<"token_rotated"> & {
  afterToken: Token;
  index: number;
};

export type TokenMoved = TaggedState<"token_moved"> & {
  srcIndex: number;
  destIndex: number;
};

export type ControllerState =
  | Initial
  | TokenSelected
  | CellClicked
  | TokenPlaced
  | TokenRotated
  | TokenMoved;
