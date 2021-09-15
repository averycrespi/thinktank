import { HeldToken, isInfiltrator, isTank, toHeld, Token } from "./token";

test("upwards tank is tank", () => {
  expect(isTank(Token.UpTank)).toBe(true);
});

test("blocker is not a tank", () => {
  expect(isTank(Token.Blocker)).toBe(false);
});

test("cardinal infiltrator is an infiltrator", () => {
  expect(isInfiltrator(Token.CardinalInfiltrator)).toBe(true);
});

test("blocker is not an infiltrator", () => {
  expect(isInfiltrator(Token.Blocker)).toBe(false);
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
