import { Outlet, useMatch } from "react-router-dom";

export default function Auth(): React.ReactElement {
  const match = useMatch("/auth/login");

  if (match !== null) {
    return <Outlet />;
  }

  return <div>Auth Page</div>;
}
