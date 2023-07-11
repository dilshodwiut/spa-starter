import type { CustomRoute } from "@/types";
import PeopleIcon from "./components/people-icon";
import Inspectors from "./views/inspectors";

const inspectorsRoutes: CustomRoute = {
  id: "inspectors",
  title: "Inspectors",
  path: "inspectors",
  element: <Inspectors />,
  Icon: PeopleIcon,
  children: [],
};

export default inspectorsRoutes;
