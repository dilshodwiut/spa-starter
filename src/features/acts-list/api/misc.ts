import request from "@/utils/axios";
import type { BaseParams, ListResponse, Region } from "@/types";
import type { Article, Reason, Violation, ViolationDoc } from "../types";

export async function getRegions(
  params: BaseParams = {},
): Promise<ListResponse<Region[]>> {
  const result: ListResponse<Region[]> = await request({
    url: "/config/regions/",
    method: "get",
    params,
  });

  return result;
}

export async function getArticles(
  params: BaseParams = {},
): Promise<ListResponse<Article[]>> {
  const result: ListResponse<Article[]> = await request({
    url: "/articles/",
    method: "get",
    params,
  });

  return result;
}

export async function getDocTypes(
  params: BaseParams = {},
): Promise<ListResponse<ViolationDoc[]>> {
  const result: ListResponse<ViolationDoc[]> = await request({
    url: "/violation-document-types/",
    method: "get",
    params,
  });

  return result;
}

export async function getViolationTypes(
  params: BaseParams = {},
): Promise<ListResponse<Violation[]>> {
  const result: ListResponse<Violation[]> = await request({
    url: "/violation-types/",
    method: "get",
    params,
  });

  return result;
}

export async function getReasons(
  params: BaseParams = {},
): Promise<ListResponse<Reason[]>> {
  const result: ListResponse<Reason[]> = await request({
    url: "/reasons/",
    method: "get",
    params,
  });

  return result;
}

export async function updateViolationType(
  id: string,
  data: { violation_type: number },
): Promise<void> {
  await request({
    url: `/violations/${id}/update-violation-type/`,
    method: "put",
    data,
  });
}

export async function updateViolationStatus(
  id: string,
  data: { status: string; reason: number; description?: string },
): Promise<void> {
  await request({
    url: `/violations/${id}/update-status/`,
    method: "put",
    data,
  });
}
