import { Outlet } from "react-router-dom";
import DefaultLayout from "@/layouts/default-layout";
import type { CustomRoute } from "@/types";

interface Props {
  getRoutes: () => CustomRoute[];
}

export default function Root(props: Props): React.ReactElement {
  const { getRoutes } = props;

  const routes = getRoutes();

  return (
    <DefaultLayout sidebarRoutes={routes[0].children as CustomRoute[]}>
      <Outlet />
    </DefaultLayout>
  );
}
