import request from "@/utils/axios";
import type { ActType, ActsParams, Response } from "../types";

export async function getAllActs(
  params: ActsParams = {},
): Promise<Response<ActType[]>> {
  const result: Response<ActType[]> = await request({
    url: "/violations/",
    method: "get",
    params,
  });

  return result;
}

export async function getAct(id: string): Promise<ActType> {
  const result: ActType = await request({
    url: `/violations/${id}`,
    method: "get",
  });

  return result;
}
