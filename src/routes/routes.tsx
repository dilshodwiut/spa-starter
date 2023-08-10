/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import type { CustomRoute } from "@/types";

// ROUTE IMPORTS
import { authRoutes } from "@/features/auth";
import { actsListRoutes } from "@/features/acts-list";
import { statsRoutes } from "@/features/stats";
import { notificationRoutes } from "@/features/notification";
import { inspectorsRoutes } from "@/features/inspectors";
import PdfGen from "@/views/pdf-gen";
import PdfGen2 from "@/views/pdf-gen-2";

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
    id: "temporary",
    title: "Temporary",
    path: "temporary",
    element: <PdfGen />,
  },
  {
    id: "temporary2",
    title: "Temporary 2",
    path: "temporary-2",
    element: <PdfGen2 />,
  },
  {
    id: "global-not-found",
    title: "Not found",
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
