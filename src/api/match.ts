/**
 * This module follows the API schema from: https://boardgame.io/documentation/#/api/Lobby
 * v0.40.0 will cause breaking changes: https://github.com/boardgameio/boardgame.io/pull/709
 *
 * Known inconsistencies:
 *  - matchID is called gameID or roomID, depending on the endpoint.
 *  - playerID is treated as a number, not a string.
 */

import { Player, nameOf } from "../logic";

import { game } from "../logic/game";

/** Represents a match. */
export interface Match {
  matchID: string;
  players: Map<Player, string | null>;
}

/** Represents the visibility of a match. */
export enum Visibility {
  PRIVATE,
  PUBLIC,
}

/** Defines headers for POST requests. */
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/** Create a match and return the match ID. */
export const createMatch = async (
  serverURL: string,
  visibility: Visibility
): Promise<string> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/create`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      numPlayers: 2,
      unlisted: visibility === Visibility.PRIVATE,
    }),
  });
  if (!resp.ok) {
    throw new Error("failed to create match: " + (await resp.text()));
  }
  const data = await resp.json();
  if (typeof data.gameID !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.gameID as string;
  }
};

/** Join a match and return the player credentials. */
export const joinMatch = async (
  serverURL: string,
  matchID: string,
  player: Player
): Promise<string> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${matchID}/join`, {
    method: "POST",
    headers,
    body: JSON.stringify({ playerID: player, playerName: nameOf(player) }),
  });
  if (!resp.ok) {
    throw new Error("failed to join match: " + (await resp.text()));
  }
  const data = await resp.json();
  if (typeof data.playerCredentials !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.playerCredentials as string;
  }
};

/** Leave a match. */
export const leaveMatch = async (
  serverURL: string,
  matchID: string,
  player: Player,
  credentials: string
): Promise<void> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${matchID}/leave`, {
    method: "POST",
    headers,
    body: JSON.stringify({ playerID: player, credentials }),
  });
  if (!resp.ok) {
    throw new Error("failed to leave match: " + (await resp.text()));
  }
};

/** List the IDs of all public matches. */
export const listMatchIDs = async (
  serverURL: string
): Promise<Array<string>> => {
  const resp = await fetch(`${serverURL}/games/${game.name}`);
  if (!resp.ok) {
    throw new Error("failed to list match IDs: " + (await resp.text()));
  }
  const data = await resp.json();
  if (
    !Array.isArray(data.rooms) ||
    data.rooms.some((r: any) => typeof r.gameID !== "string")
  ) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.rooms.map((r: any) => r.gameID) as Array<string>;
  }
};

/** Get information about a match. */
export const getMatch = async (
  serverURL: string,
  matchID: string
): Promise<Match> => {
  const resp = await fetch(`${serverURL}/games/${game.name}/${matchID}`);
  if (!resp.ok) {
    throw new Error("failed to get match: " + (await resp.text()));
  }
  const data = await resp.json();
  if (
    typeof data.roomID !== "string" ||
    !Array.isArray(data.players) ||
    data.players.some((p: any) => typeof p.id !== "number") ||
    data.players.some((p: any) => p.name && typeof p.name !== "string")
  ) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return {
      matchID: data.roomID as string,
      players: new Map<Player, string | null>(
        data.players.map((p: any) => [
          p.id.toString() as Player,
          p.name ?? null,
        ])
      ),
    };
  }
};
