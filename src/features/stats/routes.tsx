import type { CustomRoute } from "@/types";
import ChartIcon from "./components/chart-icon";
import Stats from "./views/stats";

const statsRoutes: CustomRoute = {
  id: "statistics",
  title: "statistics",
  path: "statistics",
  element: <Stats />,
  Icon: ChartIcon,
  children: [],
};

export default statsRoutes;
