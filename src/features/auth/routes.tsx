import type { CustomRoute } from "@/types";
import { Outlet } from "react-router-dom";

// VIEW IMPORTS

const routes: CustomRoute = {
  id: "auth",
  title: "Auth",
  path: "auth",
  element: (
    <>
      <div>auth route</div>
      <Outlet />
    </>
  ),
  children: [
    // ROUTES
  ],
};

export default routes;
