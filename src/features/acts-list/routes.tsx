import type { CustomRoute } from "@/types";
import NoteIcon from "./components/note-icon";
import ActsList from ".";

const actsListRoutes: CustomRoute = {
  id: "acts-list",
  title: "List of Acts",
  path: "/list-of-acts",
  element: <ActsList />,
  Icon: NoteIcon,
  children: [],
};

export default actsListRoutes;

// <Icon component={HomeOutlined as React.ForwardRefExoticComponent<any>} />
