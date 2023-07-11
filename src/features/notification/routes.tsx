import type { CustomRoute } from "@/types";
import NotificationIcon from "./components/notification-icon";
import Notification from "./views/notification";

const notificationRoutes: CustomRoute = {
  id: "notification",
  title: "Notification",
  path: "notification",
  element: <Notification />,
  Icon: NotificationIcon,
  children: [],
};

export default notificationRoutes;
