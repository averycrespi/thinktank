import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

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
      <Route exact path="/join/:match/:player">
        <JoinMatch serverURL={serverURL} />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <p>Not found</p>
      </Route>
    </Switch>
  </Router>
); // TODO: add 404 page

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
