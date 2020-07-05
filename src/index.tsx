import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CreateMatch from "./components/CreateMatch";
import Home from "./components/Home";
import LocalMultiplayer from "./components/LocalMultiplayer";
import React from "react";
import ReactDOM from "react-dom";
import Sandbox from "./components/Sandbox";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/sandbox">
        <Sandbox />
      </Route>
      <Route exact path="/local">
        <LocalMultiplayer />
      </Route>
      <Route exact path="/create">
        <CreateMatch />
      </Route>
      <Route path="/">
        <Home />
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
