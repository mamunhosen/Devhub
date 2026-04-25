import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";

import { type PathParamType } from "../datasets";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "../auth.utils";

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

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = "Bearer " + token;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        // Redirect to login or handle logout
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await apiClient<{
          data: { accessToken: string; refreshToken: string };
        }>({
          url: "/auth/refresh-token",
          method: "POST",
          data: {
            refreshToken,
          },
        });

        const tokens = response.data.data;
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization =
            "Bearer " + tokens.accessToken;
        }

        processQueue(null, tokens.accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

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
