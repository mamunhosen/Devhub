// lib/hooks/useInfiniteDataset.ts
import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { apiClient } from "@/libs/apiClient";

import { getDatasetConfig, type DatasetKey } from "../registry";
import { DEFAULT_CONFIG } from "../defaults";
import type { InfiniteDatasetConfig, ParamType, PathParamType } from "../types";

export interface UseInfiniteDatasetOptions {
  params?: ParamType;
  pathParams?: PathParamType;
  queryOptions?: Partial<UseInfiniteQueryOptions>;
}

/**
 * Hook to fetch paginated data using infinite query
 * Supports both cursor-based and offset-based pagination
 *
 * @param datasetKey - The dataset identifier
 * @param options - Optional params, pathParams and queryOptions
 */
export function useInfiniteDataset<TTransformed = unknown>(
  datasetKey: DatasetKey,
  options: UseInfiniteDatasetOptions = {},
): UseInfiniteQueryResult<TTransformed, Error> {
  const config = getDatasetConfig(datasetKey) as InfiniteDatasetConfig<
    unknown,
    TTransformed
  >;
  const paginationType =
    config.paginationType ?? DEFAULT_CONFIG.infiniteQuery.paginationType;
  const { params = {}, pathParams = {}, queryOptions = {} } = options;

  const mergedConfig = {
    staleTime: config.staleTime ?? DEFAULT_CONFIG.staleTime,
    gcTime: config.gcTime ?? DEFAULT_CONFIG.gcTime,
    retry: config.retry ?? DEFAULT_CONFIG.retry,
    ...(config.enabled ? { enabled: config.enabled(pathParams) } : {}),
    params: { ...config.params, ...params },
    pathParams: { ...config.pathParams, ...pathParams },
  };

  const queryKey =
    typeof config.getQueryKey === "function"
      ? config.getQueryKey({
          ...mergedConfig.params,
          ...mergedConfig.pathParams,
        })
      : config.getQueryKey;

  // Get defaults based on pagination type
  const defaults =
    paginationType === "cursor"
      ? DEFAULT_CONFIG.infiniteQuery.cursor
      : DEFAULT_CONFIG.infiniteQuery.offset;

  const hasCustomSelect = config.select !== undefined;
  const hasCustomGetNextPageParam = config.getNextPageParam !== undefined;

  const selectFn = hasCustomSelect ? config.select : defaults.select;
  const getNextPageParamFn = hasCustomGetNextPageParam
    ? config.getNextPageParam
    : defaults.getNextPageParam;

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const queryParams =
        paginationType === "cursor"
          ? {
              ...mergedConfig.params,
              limit: mergedConfig.params.limit || 10,
              ...(pageParam ? { nextToken: pageParam } : {}),
            }
          : {
              ...mergedConfig.params,
              limit: mergedConfig.params.limit || 10,
              skip: pageParam || 0,
            };

      const response = await apiClient({
        url: config.url,
        method: "GET",
        params: queryParams,
        pathParams: mergedConfig.pathParams,
      });
      return response.data;
    },

    initialPageParam: config.initialPageParam ?? defaults.initialPageParam,

    getNextPageParam: getNextPageParamFn as (
      lastPage: unknown,
      allPages: unknown[],
    ) => unknown,

    select: selectFn as (data: unknown) => TTransformed,

    staleTime: mergedConfig.staleTime,
    gcTime: mergedConfig.gcTime,
    retry: mergedConfig.retry,
    enabled: mergedConfig.enabled,
    ...queryOptions,
  }) as UseInfiniteQueryResult<TTransformed, Error>;
}
