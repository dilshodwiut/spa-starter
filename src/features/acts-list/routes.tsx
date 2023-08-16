/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import type { CustomRoute } from "@/types";
import getOrFetch from "@/helpers/getOrFetch";
import {
  actQuery,
  actsQuery,
  articlesQuery,
  reasonsQuery,
  // regionsQuery,
  // violationDocsQuery,
  violationTypesQuery,
} from "./queries";
import type { ActType } from "./types";

const Container = lazy(() => import("./views/container"));
const Acts = lazy(() => import("./views/acts"));
const Act = lazy(() => import("./views/act"));
const NoteIcon = lazy(() => import("./components/note-icon"));

const actsListRoutes: CustomRoute = {
  id: "acts-list",
  title: "acts-list",
  path: "list-of-acts",
  element: <Container of={<Acts />} />,
  Icon: NoteIcon,
  // loader: async () => {
  //   const resources = await Promise.all([
  //     getOrFetch(regionsQuery),
  //     getOrFetch(articlesQuery),
  //     getOrFetch(violationDocsQuery),
  //     getOrFetch(violationTypesQuery),
  //   ]);

  //   return resources;
  // },
  children: [
    {
      id: "act",
      title: "Act",
      path: ":actId",
      element: <Act />,
      loader: async ({ params }) => {
        const [act, articles, reasons, violationTypes] = await Promise.all([
          getOrFetch(() => actQuery(params.actId as string)),
          getOrFetch(articlesQuery),
          getOrFetch(reasonsQuery),
          getOrFetch(violationTypesQuery),
        ]);

        const acts = getOrFetch(() => actsQuery(act as ActType));

        return [act, acts, articles, reasons, violationTypes];
      },
    },
  ],
};

export default actsListRoutes;
