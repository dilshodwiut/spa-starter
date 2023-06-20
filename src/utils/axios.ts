import axios from "axios";
import type { AxiosError } from "axios";
import settings from "@/config/settings";

const request = axios.create({
  baseURL: settings.baseURL,
  timeout: settings.requestTimeout,
});

request.defaults.headers.timezone = new Date().getTimezoneOffset();
request.defaults.headers["Accept-Language"] =
  localStorage.getItem("lang") ?? settings.defaultLanguage;

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token !== null) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, errorHandler);

request.interceptors.response.use((response) => response.data, errorHandler);

export function errorHandler(error: AxiosError): void {
  // Using toJSON you get an object with more information about the HTTP error
  const errObj = error.toJSON();
  if (error.response !== null) {
    // server responded with a status code that falls out of the range of 2xx

    // @ts-expect-error: Nested code property may not exist in response object
    if (error.response?.data?.code === 403) {
      // refresh the token
    }

    console.error(error.response);
  }
  if (error.request !== null) {
    // no response received from server
    console.error(error.request);
  } else {
    // something happened in setting up the request
    console.error(errObj);
  }
}

export default request;
