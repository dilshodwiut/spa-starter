/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import type { CustomRoute } from "@/types";

// ROUTE IMPORTS
import { authRoutes } from "@/features/auth";
import { actsListRoutes } from "@/features/acts-list";
import { statsRoutes } from "@/features/stats";
import { notificationRoutes } from "@/features/notification";
import { inspectorsRoutes } from "@/features/inspectors";

// Global Pages
const Root = lazy(() => import("@/views/root"));
const NotFound = lazy(() => import("@/views/not-found"));
const Error = lazy(() => import("@/views/error"));

const routes: CustomRoute[] = [
  {
    id: "root",
    title: "E-Dalolatnoma",
    path: "/",
    element: <Root getRoutes={() => routes} />,
    loader: async () => null,
    errorElement: <Error />,
    children: [
      // ROUTES
      statsRoutes,
      actsListRoutes,
      notificationRoutes,
      inspectorsRoutes,
    ],
  },
  authRoutes,
  {
    id: "global-not-found",
    title: "Not found",
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
