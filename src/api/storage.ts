import { Player } from "../logic/player";

const STORAGE_KEY = "thinktank";
const CAPACITY = 10;

/** Load the queue from localStorage. */
const loadQueue = (): Array<any> => {
  let queue = null;
  try {
    queue = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "");
  } catch {} // Ignore errors.
  if (!Array.isArray(queue)) {
    queue = []; // Initialize the queue.
  }
  return queue;
};

/** Save credentials to localStorage. */
export const saveCredentials = (
  matchID: string,
  player: Player,
  credentials: string
) => {
  const queue = loadQueue();
  queue.push({ matchID, player, credentials });
  while (queue.length > CAPACITY) {
    queue.shift();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
};

/** Load credentials from localStorage. */
export const loadCredentials = (
  matchID: string,
  player: Player
): string | null => {
  const queue = loadQueue();
  for (const item of queue) {
    if (
      item &&
      item.matchID === matchID &&
      item.player === player &&
      typeof item.credentials === "string"
    ) {
      return item.credentials as string;
    }
  }
  return null;
};
