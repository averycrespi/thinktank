import { Player } from "../logic/player";
import { loadCredentials, saveCredentials } from "./storage";

test("load missing credentials", () =>
  expect(loadCredentials("match", Player.One)).toBeNull());

test("save and load credentials", () => {
  const matchID = "match";
  const player = Player.One;
  const credentials = "credentials";
  saveCredentials(matchID, player, credentials);
  expect(loadCredentials(matchID, player)).toBe(credentials);
});
