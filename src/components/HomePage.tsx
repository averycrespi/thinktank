import React from "react";
import { Player } from "../logic/player";
import { initialState } from "../logic/state";
import GameController from "./GameController";

/** Renders the home page. */
const HomePage = () => (
  <GameController state={initialState} currentPlayer={Player.One} />
);

export default HomePage;
