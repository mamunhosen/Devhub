import { useState, useMemo } from "react";

import { useDataset, type UseDatasetOptions } from "@/libs/datasets";
import { type DatasetKey } from "@/libs/datasets/registry";

import { useDebounce } from "@/libs/hooks";

import {
  SelectRoot,
  type SingleSelectProps,
  type MultiSelectProps,
  type SelectOption,
} from "./SelectRoot";

type WithDataSource<T> = Omit<
  T,
  "options" | "loading" | "onSearch" | "searchFromServer"
> & {
  datasetKey: DatasetKey;
  searchKey?: string;
  debounceMs?: number;
  queryOptions?: UseDatasetOptions;
};

type SelectRemoteSearchProps =
  | WithDataSource<SingleSelectProps>
  | WithDataSource<MultiSelectProps>;

export const SelectRemoteSearch = (props: SelectRemoteSearchProps) => {
  const {
    datasetKey,
    debounceMs,
    searchKey = "search",
    queryOptions,
    ...rest
  } = props;

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, debounceMs);

  const finalQueryOptions = useMemo<UseDatasetOptions>(() => {
    const { params: queryParams = {}, ...queryRest } = queryOptions ?? {};

    return {
      ...queryRest,
      params: {
        ...queryParams,
        [searchKey]: debouncedSearch,
      },
    };
  }, [queryOptions, searchKey, debouncedSearch]);

  const { data, isLoading } = useDataset<SelectOption[]>(
    datasetKey,
    finalQueryOptions,
  );

  return (
    <SelectRoot
      {...rest}
      options={data ?? []}
      loading={isLoading}
      onSearch={setSearch}
      searchFromServer
    />
  );
};
