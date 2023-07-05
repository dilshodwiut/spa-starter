import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from "react-router-dom";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

interface RouteExtensions {
  title?: string;
  Icon?: (props: Partial<CustomIconComponentProps>) => JSX.Element;
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: Array<RouteObject & RouteExtensions>;
}

type CustomRoute = (IndexRouteObject | CustomNonIndexRouteObject) &
  RouteExtensions;

type id = string | number;

export type { CustomRoute, id };
