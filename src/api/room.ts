/**
 * This module follows the API schema from: https://boardgame.io/documentation/#/api/Lobby
 * 0.40.0 will cause breaking changes: https://github.com/boardgameio/boardgame.io/pull/709
 */

import { game } from "../logic/game";
import { validate } from "jsonschema";

const roomSchema = require("./room.json");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/** Represents a game room. */
export interface Room {
  gameID: string;
  players: Array<{ id: 0 | 1; name?: string }>;
  setupData?: any;
}

/** Create a room and return the room ID. */
export const createRoom = async (
  serverURL: string,
  unlisted: boolean = false,
  setupData: any = {}
): Promise<string> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/create`, {
    method: "POST",
    headers,
    body: JSON.stringify({ numPlayers: 2, unlisted, setupData }),
  });
  if (!resp.ok) {
    throw new Error("failed to create room" + (await resp.text()));
  }
  const data = await resp.json();
  if (typeof data.gameID !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.gameID as string;
  }
};

/** Join a room and return the player credentials. */
export const joinRoom = async (
  serverURL: string,
  gameID: string,
  playerID: 0 | 1,
  playerName: string,
  playerData: any = {}
): Promise<string> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${gameID}/join`, {
    method: "POST",
    headers,
    body: JSON.stringify({ playerID, playerName, data: playerData }),
  });
  if (!resp.ok) {
    throw new Error("failed to join room: " + (await resp.text()));
  }
  const data = await resp.json();
  if (typeof data.playerCredentials !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.playerCredentials as string;
  }
};

/** Leave a room. */
export const leaveRoom = async (
  serverURL: string,
  gameID: string,
  playerID: 0 | 1,
  credentials: string
): Promise<void> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${gameID}/leave`, {
    method: "POST",
    headers,
    body: JSON.stringify({ playerID, credentials }),
  });
  if (!resp.ok) {
    throw new Error("failed to leave room: " + (await resp.text()));
  }
};

/** List the available rooms. */
export const listRooms = async (serverURL: string): Promise<Array<Room>> => {
  const resp = await fetch(`${serverURL}/games/${game.name}`);
  if (!resp.ok) {
    throw new Error("failed to list rooms: " + (await resp.text()));
  }
  const data = await resp.json();
  if (
    !Array.isArray(data.rooms) ||
    data.rooms.some((r: any) => !validate(r, roomSchema).valid)
  ) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.rooms as Array<Room>;
  }
};

/** Get information about a room. */
export const getRoom = async (
  serverURL: string,
  gameID: string
): Promise<Room> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${gameID}`);
  if (!resp.ok) {
    throw new Error("failed to get room: " + (await resp.text()));
  }
  const data = await resp.json();
  data.gameID = data.roomID; // Fix API inconsistency.
  if (!validate(data, roomSchema).valid) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data as Room;
  }
};
