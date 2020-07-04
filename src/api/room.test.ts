import { createRoom, getRoom, joinRoom, leaveRoom, listRooms } from "./room";

import { Server } from "boardgame.io/server";
import { game } from "../logic/game";

const port = 8000;
const serverURL = `http://localhost:${port}`;

let commands: { run: any; kill: any };
let server: { apiServer: any; appServer: any };
beforeAll(async () => {
  commands = Server({ games: [game] });
  server = await commands.run({ port });
});

afterAll(() => commands.kill(server));

test("list is empty", async () => {
  expect(await listRooms(serverURL)).toStrictEqual([]);
});

let gameID: string;
test("create room", async () => {
  gameID = await createRoom(serverURL);
});

test("list contains room", async () => {
  const rooms = await listRooms(serverURL);
  expect(rooms.some((r) => r.gameID === gameID)).toBe(true);
});

const playerID = 0;
const playerName = "Alice";
let credentials: string;
test("join room", async () => {
  credentials = await joinRoom(serverURL, gameID, playerID, playerName);
});

test("player in room", async () => {
  const room = await getRoom(serverURL, gameID);
  expect(room.gameID).toBe(gameID);
  expect(
    room.players.some((p) => p.id === playerID && p.name === playerName)
  ).toBe(true);
});

test("leave room", async () => {
  await leaveRoom(serverURL, gameID, playerID, credentials);
});
