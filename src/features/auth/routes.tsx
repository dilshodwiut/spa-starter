import type { CustomRoute } from "@/types";
import Auth from "./views/auth";
import Login from "./views/login";

const authRoutes: CustomRoute = {
  id: "auth",
  title: "Auth",
  path: "auth",
  element: <Auth />,
  children: [
    {
      id: "login",
      title: "Login",
      path: "login",
      element: <Login />,
    },
  ],
};

export default authRoutes;
