/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import type { CustomRoute } from "@/types";

// ROUTE IMPORTS
import { routes as authRoutes } from "@/features/auth";

// Global Pages
const Root = lazy(() => import("@/views/root"));
const NotFound = lazy(() => import("@/views/not-found"));
const Error = lazy(() => import("@/views/error"));

const routes: CustomRoute[] = [
  {
    id: "root",
    title: "Spa Starter",
    path: "/",
    element: <Root getRoutes={() => routes} />,
    loader: async () => null,
    errorElement: <Error />,
    children: [
      // ROUTES
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
