import { deepCopy } from "./deepCopy";

test("deep copy is strictly equal to original object", () => {
  const obj = { a: 1, b: [2, 3, 4] };
  expect(deepCopy(obj)).toStrictEqual(obj);
});

test("deep copy does not reference original object", () => {
  const obj = { a: 1, b: [2, 3, 4] };
  expect(deepCopy(obj)).not.toBe(obj);
});
