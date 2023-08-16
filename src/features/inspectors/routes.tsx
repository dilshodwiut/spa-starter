/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import getOrFetch from "@/helpers/getOrFetch";
import type { CustomRoute } from "@/types";
import { inspectorQuery } from "./queries";
import { regionsQuery } from "../acts-list";

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
      loader: async () => {
        const regions = await getOrFetch(regionsQuery);
        return regions;
      },
    },
    {
      id: "update-inspector",
      title: "Update Inspector Info",
      path: ":inspectorId",
      element: <Inspector />,
      loader: async ({ params }) => {
        const resources = await Promise.all([
          getOrFetch(() => inspectorQuery(params.inspectorId as string)),
          getOrFetch(regionsQuery),
        ]);

        return resources;
      },
    },
  ],
};

export default inspectorsRoutes;
