import React from "react";
import { initialState } from "../../logic/state";
import GameController from "../GameController";

/** Renders the home page. */
const HomePage = () => <GameController state={initialState} />;

export default HomePage;
