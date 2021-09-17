/** Return a new set with elements that satisfy a predicate. */
export const filter = <T>(s: Set<T>, f: (v: T) => boolean): Set<T> => {
  var newSet = new Set<T>();
  for (const v of s) {
    if (f(v)) {
      newSet.add(v);
    }
  }
  return newSet;
};
