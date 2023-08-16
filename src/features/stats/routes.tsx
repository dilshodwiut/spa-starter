/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import getOrFetch from "@/helpers/getOrFetch";
import type { CustomRoute } from "@/types";
import { statsQuery } from "./queries";

const ChartIcon = lazy(() => import("./components/chart-icon"));
const Stats = lazy(() => import("./views"));

const statsRoutes: CustomRoute = {
  id: "statistics",
  title: "statistics",
  path: "statistics",
  element: <Stats />,
  Icon: ChartIcon,
  children: [],
  loader: async () => {
    const res = await getOrFetch(statsQuery);
    return res;
  },
};

export default statsRoutes;
