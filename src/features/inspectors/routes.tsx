import type { CustomRoute } from "@/types";
import Inspector from "./views/inspector";
import PeopleIcon from "./components/people-icon";
import Container from "./views/container";

const inspectorsRoutes: CustomRoute = {
  id: "inspectors",
  title: "Inspectors",
  path: "inspectors",
  element: <Container />,
  Icon: PeopleIcon,
  children: [
    {
      id: "create-inspector",
      title: "Create New Inspector",
      path: "create-inspector",
      element: <Inspector />,
    },
    {
      id: "update-inspector",
      title: "Update Inspector Info",
      path: ":inspectorId",
      element: <Inspector />,
    },
  ],
};

export default inspectorsRoutes;
