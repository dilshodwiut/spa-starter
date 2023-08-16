import type { CacheQuery } from "@/types";
import type { ActType } from "../types";
import {
  getAct,
  getAllActs,
  getArticles,
  getDocTypes,
  getReasons,
  getRegions,
  getViolationTypes,
} from "../api";

export function actQuery(
  actId: string,
): CacheQuery<Awaited<ReturnType<typeof getAct>>> {
  return {
    queryKey: ["act", actId],
    queryFn: async () => {
      const res = await getAct(actId);
      return res;
    },
  };
}

export function actsQuery(
  data: ActType | undefined,
): CacheQuery<Awaited<ReturnType<typeof getAllActs>>> {
  return {
    queryKey: ["acts", { series: data?.series, number: data?.number }],
    queryFn: async () => {
      const res = await getAllActs({
        series: data?.series,
        number: data?.number,
      });
      return res;
    },
  };
}

export function articlesQuery(): CacheQuery<
  Awaited<ReturnType<typeof getArticles>>
> {
  return {
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await getArticles();
      return res;
    },
  };
}

export function reasonsQuery(): CacheQuery<
  Awaited<ReturnType<typeof getReasons>>
> {
  return {
    queryKey: ["reasons"],
    queryFn: async () => {
      const res = await getReasons();
      return res;
    },
  };
}

export function violationTypesQuery(): CacheQuery<
  Awaited<ReturnType<typeof getViolationTypes>>
> {
  return {
    queryKey: ["violation-types"],
    queryFn: async () => {
      const res = await getViolationTypes();
      return res;
    },
  };
}

export function regionsQuery(): CacheQuery<
  Awaited<ReturnType<typeof getRegions>>
> {
  return {
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await getRegions();
      return res;
    },
  };
}

export function violationDocsQuery(): CacheQuery<
  Awaited<ReturnType<typeof getDocTypes>>
> {
  return {
    queryKey: ["violation-docs"],
    queryFn: async () => {
      const res = await getDocTypes();
      return res;
    },
  };
}
