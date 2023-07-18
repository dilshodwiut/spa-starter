import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/contexts";
import DefaultLayout from "@/layouts/default-layout";
import type { CustomRoute } from "@/types";
import "@/lib/to-capital-case";

interface Props {
  getRoutes: () => CustomRoute[];
}

export default function Root(props: Props): React.ReactElement {
  const { getRoutes } = props;

  const { isAuth } = useAuthContext();

  const routes = getRoutes();

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <DefaultLayout sidebarRoutes={routes[0].children as CustomRoute[]}>
      <Outlet />
    </DefaultLayout>
  );
}
