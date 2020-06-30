/** Return a new set with elements that satisfy a predicate. */
export const filter = <T>(s: Set<T>, f: (v: T) => boolean): Set<T> => {
  var filtered = new Set<T>();
  for (const v of s) {
    if (f(v)) {
      filtered.add(v);
    }
  }
  return filtered;
};
