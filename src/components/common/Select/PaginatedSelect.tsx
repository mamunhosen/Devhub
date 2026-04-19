import { useState, useMemo } from "react";

import {
  useInfiniteDataset,
  type UseInfiniteDatasetOptions,
} from "@/libs/datasets";
import type { DatasetKey } from "@/libs/datasets/registry";
import { useDebounce } from "@/libs/hooks";

import {
  SelectRoot,
  type SingleSelectProps,
  type MultiSelectProps,
  type SelectOption,
} from "./SelectRoot";

type WithDataSource<T> = Omit<
  T,
  | "pagination"
  | "hasMore"
  | "onLoadMore"
  | "loading"
  | "options"
  | "onSearch"
  | "searchFromServer"
> & {
  datasetKey: DatasetKey;
  queryOptions?: UseInfiniteDatasetOptions;
  searchKey?: string;
  debounceMs?: number;
};

type PaginatedSelectProps =
  | WithDataSource<SingleSelectProps>
  | WithDataSource<MultiSelectProps>;

export const PaginatedSelect = (props: PaginatedSelectProps) => {
  const {
    datasetKey,
    queryOptions,
    debounceMs,
    searchKey = "search",
    ...rest
  } = props;
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, debounceMs);

  const finalQueryOptions = useMemo<UseInfiniteDatasetOptions>(() => {
    const { params: queryParams = {}, ...queryRest } = queryOptions ?? {};

    return {
      ...queryRest,
      params: {
        ...queryParams,
        ...(debouncedSearch ? { [searchKey]: debouncedSearch } : {}),
      },
    };
  }, [queryOptions, searchKey, debouncedSearch]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteDataset<SelectOption[]>(datasetKey, finalQueryOptions);

  return (
    <SelectRoot
      {...rest}
      options={data ?? []}
      loading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasMore={hasNextPage}
      onLoadMore={fetchNextPage}
      onSearch={setSearch}
      searchFromServer
      pagination
    />
  );
};
