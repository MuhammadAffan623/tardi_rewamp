import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage"));
const leaderboard = lazy(() => import("../pages/Leaderboard"));

const coreRoutes = [
  {
    path: "/login",
    title: "TARDINATORS CORE COMMUNITY",
    component: HomePage,
  },
  {
    path: "/leaderboard",
    title: "Leaderboard - TARDINATORS CORE COMMUNITY",
    component: leaderboard,
  },
];

const routes = [...coreRoutes];
export default routes;
