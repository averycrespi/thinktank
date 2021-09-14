import { PlacedToken } from "./token";
import { Player } from "./player";

/** Represents the event of a token being placed on the grid. */
export interface PlaceEvent {
  kind: "place";
  token: PlacedToken;
  index: number;
}

/** Represents the event of a token being moved from a source index to a destination index. */
export interface MoveEvent {
  kind: "move";
  token: PlacedToken;
  srcIndex: number;
  destIndex: number;
}

/** Represents the event of a token being rotated from beforeToken into afterToken. */
export interface RotateEvent {
  kind: "rotate";
  beforeToken: PlacedToken;
  afterToken: PlacedToken;
  index: number;
}

/** Represents the event of a token being shot by a tank. */
export interface ShootEvent {
  kind: "shoot";
  shooter: Player;
  shotToken: PlacedToken;
  index: number;
}

/** Represents the event of a token being captured by an infiltrator. */
export interface CaptureEvent {
  kind: "capture";
  capturer: Player;
  capturedToken: PlacedToken;
  index: number;
}

/** Represents the event of a token being exploded by a mine. */
export interface ExplodeEvent {
  kind: "explode";
  exploder: Player;
  explodedToken: PlacedToken;
  index: number;
}

/**
 * Represents an event.
 *
 * Each event must contain enough information such that a game can be replayed from only an event stream.
 */
export type Event =
  | PlaceEvent
  | MoveEvent
  | RotateEvent
  | ShootEvent
  | CaptureEvent
  | ExplodeEvent;
