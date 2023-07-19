import request from "@/utils/axios";
import type { Article, Region, ViolationDoc } from "@/types";
import type { Response } from "../types";

export async function getRegions(params = {}): Promise<Response<Region[]>> {
  const result: Response<Region[]> = await request({
    url: "/config/regions/",
    method: "get",
    params,
  });

  return result;
}

export async function getArticles(params = {}): Promise<Response<Article[]>> {
  const result: Response<Article[]> = await request({
    url: "/articles/",
    method: "get",
    params,
  });

  return result;
}

export async function getDocTypes(
  params = {},
): Promise<Response<ViolationDoc[]>> {
  const result: Response<ViolationDoc[]> = await request({
    url: "/violation-document-types/",
    method: "get",
    params,
  });

  return result;
}
