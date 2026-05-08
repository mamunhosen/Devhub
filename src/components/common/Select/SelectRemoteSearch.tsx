import { useState, useMemo } from "react";

import { useDataset, type UseDatasetOptions } from "@/libs/datasets";
import { type DatasetKey } from "@/libs/datasets/registry";

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
  queryOptions?: UseDatasetOptions;
};

type SelectRemoteSearchProps =
  | WithDataSource<SingleSelectProps>
  | WithDataSource<MultiSelectProps>;

export const SelectRemoteSearch = (props: SelectRemoteSearchProps) => {
  const { datasetKey, searchKey = "search", queryOptions, ...rest } = props;

  const [search, setSearch] = useState<string>("");

  const finalQueryOptions = useMemo<UseDatasetOptions>(() => {
    const { params: queryParams = {}, ...queryRest } = queryOptions ?? {};

    return {
      ...queryRest,
      params: {
        ...queryParams,
        [searchKey]: search,
      },
    };
  }, [queryOptions, searchKey, search]);

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
