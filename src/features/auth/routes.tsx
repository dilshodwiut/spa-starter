import { Outlet } from "react-router-dom";
import type { CustomRoute } from "@/types";

// VIEW IMPORTS

const authRoutes: CustomRoute = {
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

export default authRoutes;
