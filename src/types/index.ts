import type { RouteObject } from "react-router-dom";

type CustomRoute = RouteObject & { title?: string };
type id = string;

export type { CustomRoute, id };
