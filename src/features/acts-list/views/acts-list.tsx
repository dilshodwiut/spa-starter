import { Outlet, useMatch } from "react-router-dom";
import Acts from "./acts";

export default function ActsList(): React.ReactElement {
  const match = useMatch("/list-of-acts/:actId");

  if (match !== null) {
    return <Outlet />;
  }

  return <Acts />;
}
