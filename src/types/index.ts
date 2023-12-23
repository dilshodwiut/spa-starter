import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from "react-router-dom";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

type AppLang = "en" | "es" | "ru";

interface RouteExtensions {
  title?: string;
  Icon?: (
    props: Partial<CustomIconComponentProps>,
  ) => React.ReactElement | null;
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: Array<RouteObject & RouteExtensions>;
}

type CustomRoute = (IndexRouteObject | CustomNonIndexRouteObject) &
  RouteExtensions;

interface District {
  id: number;
  name: string;
  code: string;
}

interface Region {
  id: number;
  name: string;
  code: string;
  serial: string;
  parent: number;
  districts: District[];
}

interface BaseEntity {
  id: number;
  name: string;
}

interface BaseParams {
  page?: number;
  page_size?: number;
}

interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export type {
  CustomRoute,
  Region,
  District,
  BaseEntity,
  BaseParams,
  ListResponse,
  AppLang,
};
