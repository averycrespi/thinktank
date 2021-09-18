import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./components/HomePage";

import "bootswatch/dist/darkly/bootstrap.min.css";
import "./styles/thinktank.css";
import CreateGamePage from "./components/CreateGamePage";
import JoinGamePage from "./components/JoinGamePage";
import SandboxPage from "./components/SandboxPage";

const serverURL = process.env.REACT_APP_URL ?? "http://localhost:8000";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/sandbox">
        <SandboxPage />
      </Route>
      <Route exact path="/create">
        <CreateGamePage />
      </Route>
      <Route exact path="/join">
        <JoinGamePage />
      </Route>
      <Route exact path="/">
        <HomePage serverURL={serverURL} />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
