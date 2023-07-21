/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import type { CustomRoute } from "@/types";

const Container = lazy(() => import("./views/container"));
const Inspectors = lazy(() => import("./views/inspectors"));
const Inspector = lazy(() => import("./views/inspector"));
const PeopleIcon = lazy(() => import("./components/people-icon"));

const inspectorsRoutes: CustomRoute = {
  id: "inspectors",
  title: "inspectors",
  path: "inspectors",
  element: <Container of={<Inspectors />} />,
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
