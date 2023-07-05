import type { CustomRoute } from "@/types";
import ChartIcon from "./components/chart-icon";
import Stats from ".";

const statsRoutes: CustomRoute = {
  id: "stats",
  title: "Statistics",
  path: "/statistics",
  element: <Stats />,
  Icon: ChartIcon,
  children: [],
};

export default statsRoutes;
