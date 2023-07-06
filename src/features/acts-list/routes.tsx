import type { CustomRoute } from "@/types";
import NoteIcon from "./components/note-icon";
import ActsList from "./views/acts-list";

const actsListRoutes: CustomRoute = {
  id: "acts-list",
  title: "List of Acts",
  path: "/list-of-acts",
  element: <ActsList />,
  Icon: NoteIcon,
  children: [],
};

export default actsListRoutes;
