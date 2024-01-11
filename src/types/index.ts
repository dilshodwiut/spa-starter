import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from "react-router-dom";

type AppLang = "uzLatin" | "uzCryllic" | "ru";

interface RouteExtensions {
  title?: string;
  Icon?: (props: Partial<{}>) => React.ReactElement | null;
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
