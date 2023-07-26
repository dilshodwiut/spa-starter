import request from "@/utils/axios";
import type { BaseParams, ListResponse } from "@/types";
import type { InspectorType } from "../types";

export async function getAllInspectors(
  params: BaseParams & { search?: string } = {},
): Promise<ListResponse<InspectorType[]>> {
  const result: ListResponse<InspectorType[]> = await request({
    url: "/account/users/",
    method: "get",
    params,
  });

  return result;
}

export async function getInspector(id: string): Promise<InspectorType> {
  const result: InspectorType = await request({
    url: `/account/users/${id}`,
    method: "get",
  });

  return result;
}

export async function createInspector(
  data: Exclude<Partial<InspectorType>, "id">,
): Promise<Exclude<Partial<InspectorType>, "id">> {
  const result: Exclude<Partial<InspectorType>, "id"> = await request({
    url: `/account/users`,
    method: "post",
    data,
  });

  return result;
}

export async function updateInspector(
  id: string,
  data: Exclude<Partial<InspectorType>, "id">,
): Promise<Exclude<Partial<InspectorType>, "id">> {
  const result: Exclude<Partial<InspectorType>, "id"> = await request({
    url: `/account/users/${id}`,
    method: "put",
    data,
  });

  return result;
}
