/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import type { CustomRoute } from "@/types";

const NotificationIcon = lazy(() => import("./components/notification-icon"));
const Notification = lazy(() => import("./views/notification"));

const notificationRoutes: CustomRoute = {
  id: "notification",
  title: "notification",
  path: "notification",
  element: <Notification />,
  Icon: NotificationIcon,
  children: [],
};

export default notificationRoutes;
