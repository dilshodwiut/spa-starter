import type { CustomRoute } from "@/types";
import { authRoutes, jobRoutes } from "@/features";
import Root from "@/views/Root";

const routes: CustomRoute[] = [
  {
    id: "root",
    title: "MVD",
    path: "/",
    element: <Root />,
    loader: async () => null,
    errorElement: <div>Error element</div>,
    children: [jobRoutes],
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
