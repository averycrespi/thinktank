import {
  HeldToken,
  isInfiltrator,
  isTank,
  nameOf,
  toHeld,
  Token,
} from "./token";

test("tokens have meaningful names", () => {
  expect(nameOf(Token.Blocker)).toBe("Blocker");
  expect(nameOf(Token.UpTank)).toBe("Upwards Tank");
  expect(nameOf(Token.DownTank)).toBe("Downwards Tank");
  expect(nameOf(Token.LeftTank)).toBe("Leftwards Tank");
  expect(nameOf(Token.RightTank)).toBe("Rightwards Tank");
  expect(nameOf(Token.CardinalInfiltrator)).toBe("Cardinal Infiltrator");
  expect(nameOf(Token.DiagonalInfiltrator)).toBe("Diagonal Infiltrator");
  expect(nameOf(Token.Mine)).toBe("Mine");
  expect(nameOf(Token.Base)).toBe("Base");
});

test("upwards tank is a tank", () => {
  expect(isTank(Token.UpTank)).toBeTruthy();
});

test("blocker is not a tank", () => {
  expect(isTank(Token.Blocker)).toBeFalsy();
});

test("cardinal infiltrator is an infiltrator", () => {
  expect(isInfiltrator(Token.CardinalInfiltrator)).toBeTruthy();
});

test("blocker is not an infiltrator", () => {
  expect(isInfiltrator(Token.Blocker)).toBeFalsy();
});

test("blocker is converted to held blocker", () => {
  expect(toHeld(Token.Blocker)).toBe(HeldToken.Blocker);
});

test("tanks are converted to held tanks", () => {
  const tanks = [Token.UpTank, Token.DownTank, Token.LeftTank, Token.DownTank];
  for (const tank of tanks) {
    expect(toHeld(tank)).toBe(HeldToken.Tank);
  }
});

test("cardinal infiltrator is converted to held cardinal infiltrator", () => {
  expect(toHeld(Token.CardinalInfiltrator)).toBe(HeldToken.CardinalInfiltrator);
});

test("diagonal infiltrator is converted to held diagonal infiltrator", () => {
  expect(toHeld(Token.DiagonalInfiltrator)).toBe(HeldToken.DiagonalInfiltrator);
});

test("mine is converted to held mine", () => {
  expect(toHeld(Token.Mine)).toBe(HeldToken.Mine);
});

test("base is converted to held base", () => {
  expect(toHeld(Token.Base)).toBe(HeldToken.Base);
});
