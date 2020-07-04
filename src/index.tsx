import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";

const App = () => (
  <Router>
    <Switch>
      {Object.values(routes).map((r) => (
        <Route path={r.path}>{r.component}</Route>
      ))}
    </Switch>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
