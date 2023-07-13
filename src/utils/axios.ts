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

export function errorHandler(error: AxiosError): void {
  if (error.response !== null) {
    // server responded with a status code that falls out of the range of 2xx

    // @ts-expect-error: Nested code property may not exist in response object
    if (error.response?.data?.code === 403) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token !== null) {
        refreshToken({ refresh_token })
          .then((res) => {
            const { refresh, access } = res;
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("access-token", access);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    console.error(error.response);
  } else if (error.request !== null) {
    // no response received from server
    console.error(error.request);
  } else {
    // something happened in setting up the request
    console.error(error.message);
  }

  // Using toJSON you get an object with more information about the HTTP error
  console.log(
    "Error config object:",
    error.config,
    "\nError object as json:",
    error.toJSON(),
  );
}

export default request;
