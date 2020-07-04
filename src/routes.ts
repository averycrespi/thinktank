import LocalMultiplayer from "./components/LocalMultiplayer";
import Sandbox from "./components/Sandbox";
import Welcome from "./components/Welcome";

const routes = {
  sandbox: { component: Sandbox, path: "/sandbox", name: "Sandbox" },
  local: {
    component: LocalMultiplayer,
    path: "/local",
    name: "Local Multiplayer",
  },
  welcome: { component: Welcome, path: "/", name: "Welcome" },
};

export default routes;
