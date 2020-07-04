import { Player, opponentOf } from "../logic";
import {
  createMatch,
  getMatch,
  joinMatch,
  leaveMatch,
  listMatchIDs,
} from "./match";

import { Server } from "boardgame.io/server";
import { game } from "../logic/game";

const port = parseInt(process.env.REACT_APP_PORT ?? "8000");
const serverURL = `http://localhost:${port}`;

let commands: { run: any; kill: any };
let server: { apiServer: any; appServer: any };
beforeAll(async () => {
  commands = Server({ games: [game] });
  server = await commands.run({ port });
});

afterAll(() => commands.kill(server));

test("list is empty", async () => {
  expect(await listMatchIDs(serverURL)).toStrictEqual([]);
});

let matchID: string;
test("create match", async () => {
  matchID = await createMatch(serverURL);
});

test("list contains match", async () => {
  const matchIDs = await listMatchIDs(serverURL);
  expect(matchIDs).toStrictEqual([matchID]);
});

const player = Player.Red;
const playerName = "Alice";
let playerCredentials: string;
test("player joins match ", async () => {
  playerCredentials = await joinMatch(serverURL, matchID, player, playerName);
});

test("player in match", async () => {
  const match = await getMatch(serverURL, matchID);
  expect(match.matchID).toBe(matchID);
  expect(match.players.get(player)).toBe(playerName);
  expect(match.players.get(opponentOf(player))).toBe(null);
});

const opponent = opponentOf(player);
const opponentName = "Bob";
let opponentCredentials: string;
test("opponent joins match", async () => {
  opponentCredentials = await joinMatch(
    serverURL,
    matchID,
    opponent,
    opponentName
  );
});

test("player and opponent in match", async () => {
  const match = await getMatch(serverURL, matchID);
  expect(match.matchID).toBe(matchID);
  expect(match.players.get(player)).toBe(playerName);
  expect(match.players.get(opponentOf(player))).toBe(opponentName);
});

test("player leaves match", async () => {
  await leaveMatch(serverURL, matchID, player, playerCredentials);
});

test("opponent in match", async () => {
  const match = await getMatch(serverURL, matchID);
  expect(match.matchID).toBe(matchID);
  expect(match.players.get(player)).toBe(null);
  expect(match.players.get(opponentOf(player))).toBe(opponentName);
});

test("opponent leaves match", async () => {
  await leaveMatch(serverURL, matchID, opponent, opponentCredentials);
});

test("list is empty", async () => {
  expect(await listMatchIDs(serverURL)).toStrictEqual([]);
});
