import { Outlet, useMatch } from "react-router-dom";
import ActsTable from "./acts-table";

export default function ActsList(): React.ReactElement {
  const match = useMatch("/list-of-acts/:actId");

  if (match !== null) {
    return <Outlet />;
  }

  return <ActsTable />;
}
