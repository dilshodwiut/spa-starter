import request from "@/utils/axios";
import type { AxiosResponse } from "axios";

interface AuthResponse {
  access: string;
  refresh: string;
}

export async function login(data: {
  username: string;
  password: string;
}): Promise<AuthResponse> {
  const res: AuthResponse = await request({
    url: "account/me/",
    method: "post",
    data,
  });

  return res;
}

export async function refreshToken(data: {
  refresh_token: string;
}): Promise<AxiosResponse<AuthResponse>> {
  const res = await request({
    url: "account/me/refresh/",
    method: "post",
    data,
  });

  return res;
}
