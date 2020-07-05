import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import CreateMatch from "./components/CreateMatch";
import Home from "./components/Home";
import JoinMatch from "./components/JoinMatch";
import React from "react";
import ReactDOM from "react-dom";
import Sandbox from "./components/Sandbox";

const serverURL = process.env.REACT_APP_URL ?? "http://localhost:8000";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/sandbox">
        <Sandbox />
      </Route>
      <Route exact path="/create">
        <CreateMatch serverURL={serverURL} />
      </Route>
      <Route exact path="/join/:matchID/:player">
        <JoinMatch serverURL={serverURL} />
      </Route>
      <Route exact path="/">
        <Home serverURL={serverURL} />
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
