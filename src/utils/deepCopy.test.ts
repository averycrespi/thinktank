import { deepCopy } from "./deepCopy";

test("deep copy is strictly equal to original object", () => {
  const obj = { a: 1, b: 2 };
  expect(deepCopy(obj)).toStrictEqual(obj);
});
