import { Navigate, Outlet, useMatch } from "react-router-dom";
import { useAuthContext } from "@/contexts";

export default function Auth(): React.ReactElement {
  const match = useMatch("/auth/login");
  const { isAuth } = useAuthContext();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  if (match !== null) {
    return <Outlet />;
  }

  return <> </>;
}
