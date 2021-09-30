import { applyAction, MoveAction, PlaceAction, RotateAction } from ".";
import { Player } from "../player";
import { initialState } from "../state";
import { Token } from "../token";

test("apply place action", () => {
  const action: PlaceAction = { kind: "place", token: Token.Blocker, index: 0 };
  expect(applyAction(initialState, Player.One, action)).toBeNull();
});

test("apply rotate action", () => {
  const action: RotateAction = {
    kind: "rotate",
    afterToken: Token.UpTank,
    index: 0,
  };
  expect(applyAction(initialState, Player.One, action)).toBeNull();
});

test("apply move action", () => {
  const action: MoveAction = {
    kind: "move",
    srcIndex: 0,
    destIndex: 1,
  };
  expect(applyAction(initialState, Player.One, action)).toBeNull();
});
