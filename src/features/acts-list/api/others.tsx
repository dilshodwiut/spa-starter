import request from "@/utils/axios";
import type { Region } from "@/types";
import type { Response } from "../types";

export async function getRegions(params = {}): Promise<Response<Region[]>> {
  const result: Response<Region[]> = await request({
    url: "/config/regions/",
    method: "get",
    params,
  });

  return result;
}

export async function getArticles(params = {}): Promise<unknown> {
  const result = await request({
    url: "/articles/",
    method: "get",
    params,
  });

  return result;
}
