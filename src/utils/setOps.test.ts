test("filter set", () => {
  const s = new Set<number>([1, 2, 3, 4, 5]);
  expect(s.filter((n) => n % 2 === 0)).toStrictEqual(new Set<Number>([2, 4]));
});

export {};
