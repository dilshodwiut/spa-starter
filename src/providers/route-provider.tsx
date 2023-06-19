import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "@/routes/routes";

export default function RouteProvider(): React.ReactElement {
  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
