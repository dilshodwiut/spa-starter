/* eslint-disable @typescript-eslint/promise-function-async */
import { lazy } from "react";
import type { CustomRoute } from "@/types";

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
  children: [{ id: "act", title: "Act", path: ":actId", element: <Act /> }],
};

export default actsListRoutes;
