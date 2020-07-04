import Board from "../Board";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { Player } from "../../logic";
import React from "react";
import { game } from "../../logic/game";

const LocalMultiplayerClient = Client({
  game,
  board: Board,
  // @ts-ignore: Ignore Local() typing error.
  multiplayer: Local(),
});

/** Render a local multiplayer game. */
const LocalMultiplayer = () => (
  <div id="local-multiplayer" style={{ display: "flex" }}>
    <div style={{ flex: "0 0 50%" }}>
      <LocalMultiplayerClient playerID={Player.Red} />
    </div>
    <div style={{ flex: "1" }}>
      <LocalMultiplayerClient playerID={Player.Blue} />
    </div>
  </div>
);

export default LocalMultiplayer;
