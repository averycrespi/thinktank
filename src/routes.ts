import LocalMultiplayer from "./components/LocalMultiplayer";
import Sandbox from "./components/Sandbox";
import Welcome from "./components/Welcome";

const routes = [
  { component: Sandbox, path: "/sandbox", name: "Sandbox" },
  { component: LocalMultiplayer, path: "/local", name: "Local Multiplayer" },
  { component: Welcome, path: "/", name: "Welcome" },
];

export default routes;
