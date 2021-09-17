import { filter } from "./setOps";

test("filter set", () => {
  const s = new Set<number>([1, 2, 3, 4, 5]);
  expect(filter(s, (n) => n % 2 === 0)).toStrictEqual(new Set([2, 4]));
});

export {};
