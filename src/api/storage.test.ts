import { loadCredentials, saveCredentials } from "./storage";

import { Player } from "../logic";

test("load missing credentials", () =>
  expect(loadCredentials("match", Player.Red)).toBe(null));

test("save and load credentials", () => {
  const matchID = "match";
  const player = Player.Red;
  const credentials = "credentials";
  saveCredentials(matchID, player, credentials);
  expect(loadCredentials(matchID, player)).toBe(credentials);
});
