import { type SelectOption } from "@/components/common";
export type ParamType = {
  limit?: number;
  skip?: number;
  nextToken?: string;
  [key: string]: string | number | boolean | undefined;
};

export type PaginationType = "cursor" | "offset";

export type PathParamType = Record<string, string>;

export interface BaseDatasetConfig<TData, TTransformed> {
  url: string;
  getQueryKey: (params?: ParamType) => readonly unknown[];

  params?: ParamType;
  pathParams?: PathParamType;
  select?: (data: TData) => TTransformed;
  enabled?: (params?: PathParamType) => boolean;
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean;
}

export interface InfiniteDatasetConfig<
  TData,
  TTransformed = TData,
> extends BaseDatasetConfig<TData, TTransformed> {
  paginationType?: PaginationType;
  initialPageParam?: number | string;
  getNextPageParam?: (
    lastPage: unknown,
    allPages: unknown[],
  ) => number | string | undefined;
}

export type DatasetConfig<TData, TTransformed = TData> =
  | BaseDatasetConfig<TData, TTransformed>
  | InfiniteDatasetConfig<TData, TTransformed>;

export type DatasetRegistry = Record<
  string,
  DatasetConfig<unknown, SelectOption[]>
>;

/**
 * Standard select and Paginated select item
 */
export interface OptionItem {
  id: string | number;
  name: string;
}

/**
 * Standard response format expected by default select
 */
export interface DefaultSelectResponse<T = OptionItem> {
  data: T[];
  success: boolean;
  count: number;
}

export interface CursorPaginatedDatasetResponse<T = OptionItem> {
  success: boolean;
  data: T[];
  count: number;
  nextToken: string | null;
}

export interface OffsetPaginatedDatasetResponse<T = OptionItem> {
  success: boolean;
  data: T[];
  count: number;
  total: number;
  skip: number;
  limit: number;
}

export interface CursorPaginatedDatasetPagesResponse<T = OptionItem> {
  pages: CursorPaginatedDatasetResponse<T>[];
}

export interface OffsetPaginatedDatasetPagesResponse<T = OptionItem> {
  pages: OffsetPaginatedDatasetResponse<T>[];
}
