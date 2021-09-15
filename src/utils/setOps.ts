declare global {
  interface Set<T> {
    filter(f: (v: T) => boolean): Set<T>;
  }
}

// eslint-disable-next-line no-extend-native
Set.prototype.filter = function filter(f) {
  var newSet = new Set();
  for (var v of this) if (f(v)) newSet.add(v);
  return newSet;
};

export {};
