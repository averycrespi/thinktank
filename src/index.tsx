import "./styles/thinktank.css";
import "../node_modules/papercss/dist/paper.min.css";

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import HelpPage from "./components/HelpPage";
import HomePage from "./components/HomePage";
import JoinPage from "./components/JoinPage";
import React from "react";
import ReactDOM from "react-dom";
import SandboxPage from "./components/SandboxPage";
import "./utils/setOps";

const serverURL = process.env.REACT_APP_URL ?? "http://localhost:8000";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/help">
        <HelpPage />
      </Route>
      <Route exact path="/sandbox">
        <SandboxPage />
      </Route>
      <Route exact path="/join/:matchID/:player">
        <JoinPage serverURL={serverURL} />
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
