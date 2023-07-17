import axios from "axios";
import type { AxiosError } from "axios";
import settings from "@/config/settings";
import { refreshToken } from "@/features/auth/api";

const request = axios.create({
  baseURL: settings.baseURL,
  timeout: settings.requestTimeout,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token !== null) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  // config.validateStatus = (status) => status < 500;

  return config;
}, errorHandler);

request.interceptors.response.use((response) => response.data, errorHandler);

export async function errorHandler(
  error: AxiosError,
): Promise<PromiseRejectedResult> {
  if (error.response !== null) {
    // server responded with a status code that falls out of the range of 2xx

    // @ts-expect-error: Nested code property may not exist in response object
    if (error.response?.data?.code === 401) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token !== null) {
        try {
          const res = await refreshToken({ refresh_token });
          const { refresh, access } = res.data;
          localStorage.setItem("refresh_token", refresh);
          localStorage.setItem("access-token", access);
        } catch (err) {
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_token");
          window.location.replace("/auth/login");
        }
      }
    }

    const rejectedRes = await Promise.reject(error.response);
    return rejectedRes;
  }
  if (error.request !== null) {
    // no response received from server
    const rejectedReq = await Promise.reject(error.request);
    return rejectedReq;
  }

  // something happened in setting up the request
  console.error(error.message);

  console.log("Error config object:", error.config);

  // Using toJSON you get an object with more information about the HTTP error
  console.log("\nError object as json:", error.toJSON());

  const rejectedErr = await Promise.reject(error);
  return rejectedErr;
}

export default request;
