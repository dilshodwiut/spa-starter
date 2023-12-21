import request from "@/utils/axios";
import type { ListResponse } from "@/types";
import type { ActType, ActsParams } from "../types";

export async function getAllActs(
  params: ActsParams = {},
): Promise<ListResponse<ActType[]>> {
  const result: ListResponse<ActType[]> = await request({
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
