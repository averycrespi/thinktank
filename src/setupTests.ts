// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

var localStorageMock = (function () {
  var storage: any = {};
  return {
    getItem: (key: any) => storage[key] || null,
    setItem: (key: string, value: any) => {
      storage[key] = value.toString();
    },
    clear: () => {
      storage = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
