import {
  Visibility,
  createMatch,
  getMatch,
  joinMatch,
  leaveMatch,
  listMatchIDs,
} from "./match";

import { Server } from "boardgame.io/server";
import { game } from "../logic/game";
import { nameOf, opponentOf, Player } from "../logic/player";
import fetchMock from "jest-fetch-mock";

// Use a different port to prevent port collision if server is running.
const port = parseInt(process.env.REACT_APP_SERVER_PORT ?? "8001");
const serverURL = `http://localhost:${port}`;

let commands: { run: any; kill: any };
let server: { apiServer: any; appServer: any };
beforeAll(async () => {
  fetchMock.dontMock();
  commands = Server({ games: [game] });
  server = await commands.run({ port });
});

afterAll(() => commands.kill(server));

test("match list is empty", async () => {
  expect(await listMatchIDs(serverURL)).toStrictEqual([]);
});

let matchID: string;
test("create public match", async () => {
  matchID = await createMatch(serverURL, Visibility.PUBLIC);
});

test("match list contains match", async () => {
  const matchIDs = await listMatchIDs(serverURL);
  expect(matchIDs).toStrictEqual([matchID]);
});

const player = Player.One;
let playerCredentials: string;
test("player joins match", async () => {
  playerCredentials = await joinMatch(serverURL, matchID, player);
});

test("player in match", async () => {
  const match = await getMatch(serverURL, matchID);
  expect(match.matchID).toBe(matchID);
  expect(match.players.get(player)).toBe(nameOf(player));
  expect(match.players.get(opponentOf(player))).toBeNull();
});

const opponent = opponentOf(player);
let opponentCredentials: string;
test("opponent joins match", async () => {
  opponentCredentials = await joinMatch(serverURL, matchID, opponent);
});

test("player and opponent in match", async () => {
  const match = await getMatch(serverURL, matchID);
  expect(match.matchID).toBe(matchID);
  expect(match.players.get(player)).toBe(nameOf(player));
  expect(match.players.get(opponentOf(player))).toBe(nameOf(opponent));
});

test("player leaves match", async () => {
  await leaveMatch(serverURL, matchID, player, playerCredentials);
});

test("opponent in match", async () => {
  const match = await getMatch(serverURL, matchID);
  expect(match.matchID).toBe(matchID);
  expect(match.players.get(player)).toBeNull();
  expect(match.players.get(opponentOf(player))).toBe(nameOf(opponent));
});

test("opponent leaves match", async () => {
  await leaveMatch(serverURL, matchID, opponent, opponentCredentials);
});

test("match list is empty", async () => {
  expect(await listMatchIDs(serverURL)).toStrictEqual([]);
});
