import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "@/routes/routes";
import Spinner from "@/components/spinner";

export default function RouteProvider(): React.ReactElement {
  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
