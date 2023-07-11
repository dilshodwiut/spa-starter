import type { CustomRoute } from "@/types";

// ROUTE IMPORTS
import { authRoutes } from "@/features/auth";
import { actsListRoutes } from "@/features/acts-list";
import { statsRoutes } from "@/features/stats";
import { notificationRoutes } from "@/features/notification";
import { inspectorsRoutes } from "@/features/inspectors";

// Global Pages
import Root from "@/views/root";
import NotFound from "@/views/not-found";
import Error from "@/views/error";

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
