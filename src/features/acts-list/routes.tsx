import type { CustomRoute } from "@/types";
import NoteIcon from "./components/note-icon";
import ActsList from "./views/acts-list";
import Act from "./views/act";

const actsListRoutes: CustomRoute = {
  id: "acts-list",
  title: "List of Acts",
  path: "list-of-acts",
  element: <ActsList />,
  Icon: NoteIcon,
  children: [{ id: "act", title: "Act", path: ":actId", element: <Act /> }],
};

export default actsListRoutes;
