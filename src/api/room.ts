/** This module follows the API schema from: https://boardgame.io/documentation/#/api/Lobby */

import { game } from "../logic/game";
import { validate } from "jsonschema";

const roomSchema = require("./room.json");

/** Represents a game room. */
export interface Room {
  roomID: string;
  players: Array<{ id: string; name?: string }>;
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
    body: JSON.stringify({ numPlayers: 2, unlisted, setupData }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("failed to create room: " + JSON.stringify(data));
  } else if (typeof data.gameID !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.gameID as string;
  }
};

/** Join a room and return the player credentials. */
export const joinRoom = async (
  serverURL: string,
  roomID: string,
  playerID: string,
  playerName: string,
  playerData: any = {}
): Promise<string> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${roomID}/join`, {
    method: "POST",
    body: JSON.stringify({ playerID, playerName, data: playerData }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("failed to join room: " + JSON.stringify(data));
  } else if (typeof data.playerCredentials !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.playerCredentials as string;
  }
};

/** Leave a room. */
export const leaveRoom = async (
  serverURL: string,
  roomID: string,
  playerID: string,
  credentials: string
): Promise<void> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${roomID}/leave`, {
    method: "POST",
    body: JSON.stringify({ playerID, credentials }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("failed to leave room: " + JSON.stringify(data));
  }
};

/** List the available rooms. */
export const listRooms = async (serverURL: string): Promise<Array<Room>> => {
  const resp = await fetch(`${serverURL}/games/${game.name}`);
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("failed to list rooms: " + JSON.stringify(data));
  } else if (
    !Array.isArray(data.rooms) ||
    data.rooms.some((r: any) => !validate(r, roomSchema))
  ) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.rooms as Array<Room>;
  }
};

/** Get information about a specific room. */
export const getRoom = async (
  serverURL: string,
  roomID: string
): Promise<Room> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${roomID}`);
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("failed to get room: " + JSON.stringify(data));
  } else if (!validate(data, roomSchema)) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data as Room;
  }
};
