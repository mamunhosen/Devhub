// lib/hooks/useDataset.ts
import {
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { apiClient } from "@/libs/apiClient";

import { getDatasetConfig, type DatasetKey } from "../registry";
import { DEFAULT_CONFIG } from "../defaults";
import {
  type ParamType,
  type PathParamType,
  type BaseDatasetConfig,
} from "../types";

export interface UseDatasetOptions {
  params?: ParamType;
  pathParams?: PathParamType;
  queryOptions?: Partial<UseQueryOptions>;
}

/**
 * Hook to fetch data using dataset configuration
 *
 * @param datasetKey - The dataset identifier
 * @param options - Optional params, pathParams and query options
 */
export function useDataset<TTransformed = unknown>(
  datasetKey: DatasetKey,
  options: UseDatasetOptions = {},
): UseQueryResult<TTransformed, Error> {
  const config = getDatasetConfig(datasetKey) as BaseDatasetConfig<
    unknown,
    TTransformed
  >;
  const { params = {}, pathParams = {}, queryOptions = {} } = options;

  const mergedConfig = {
    staleTime: config.staleTime ?? DEFAULT_CONFIG.staleTime,
    gcTime: config.gcTime ?? DEFAULT_CONFIG.gcTime,
    retry: config.retry ?? DEFAULT_CONFIG.retry,
    ...(config.enabled ? { enabled: config.enabled(pathParams) } : {}),
    params: { ...config.params, ...params },
    pathParams: { ...config.pathParams, ...pathParams },
  };

  const hasCustomSelect = config.select !== undefined;
  const selectFn = hasCustomSelect ? config.select : DEFAULT_CONFIG.select;

  const queryKey =
    typeof config.getQueryKey === "function"
      ? config.getQueryKey({
          ...mergedConfig.params,
          ...mergedConfig.pathParams,
        })
      : config.getQueryKey;

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await apiClient({
        url: config.url,
        method: "GET",
        params: mergedConfig.params,
        pathParams: mergedConfig.pathParams,
      });
      return response.data;
    },
    select: selectFn as (data: unknown) => TTransformed,
    staleTime: mergedConfig.staleTime,
    gcTime: mergedConfig.gcTime,
    retry: mergedConfig.retry,
    enabled: mergedConfig.enabled,
    ...queryOptions,
  }) as UseQueryResult<TTransformed, Error>;
}
