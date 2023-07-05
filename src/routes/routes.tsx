import type { CustomRoute } from "@/types";
import {
  authRoutes,
  actsListRoutes,
  statsRoutes,
  notificationRoutes,
} from "@/features";
import Root from "@/views/root";

const routes: CustomRoute[] = [
  {
    id: "root",
    title: "E-Dalolatnoma",
    path: "/",
    element: <Root getRoutes={() => routes} />,
    loader: async () => null,
    errorElement: <div>Error element</div>,
    children: [statsRoutes, actsListRoutes, notificationRoutes],
  },
  authRoutes,
  {
    id: "global-not-found",
    title: "Not found",
    path: "*",
    element: <h1>404: Page not found</h1>,
  },
];

export default routes;
