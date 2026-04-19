import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

import { type PathParamType } from "../datasets";

import baseConfig from "./config";

interface CustomAxiosRequestConfig<D = unknown> extends Omit<
  AxiosRequestConfig<D>,
  "url"
> {
  url: string;
  pathParams?: PathParamType;
}

// Helper to build endpoint with path params
function buildEndpoint(endpoint: string, pathParams?: PathParamType): string {
  if (!pathParams) return endpoint;
  let builtEndpoint = endpoint;
  Object.entries(pathParams).forEach(([key, value]) => {
    builtEndpoint = builtEndpoint.replace(`:${key}`, value);
  });
  return builtEndpoint;
}

const axiosInstance = axios.create(baseConfig);

async function apiClient<T = unknown>(
  config: CustomAxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  const { url, pathParams, ...restConfig } = config;

  const finalUrl = buildEndpoint(url, pathParams);

  return axiosInstance.request<T>({
    ...restConfig,
    url: finalUrl,
  });
}

export { apiClient, axiosInstance };
