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

test("limit number of credentials that are saved", () => {
  const matchID = "match";
  const player = Player.One;
  const credentials = "credentials";
  saveCredentials(matchID, player, credentials);
  for (let i = 0; i < 10; i++) {
    saveCredentials(i.toString(), player, "");
  }
  expect(loadCredentials(matchID, player)).toBeNull();
});
