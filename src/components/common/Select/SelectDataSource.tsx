import { useDataset, type UseDatasetOptions } from "@/libs/datasets";
import { type DatasetKey } from "@/libs/datasets/registry";

import {
  SelectRoot,
  type SingleSelectProps,
  type MultiSelectProps,
  type SelectOption,
} from "./SelectRoot";

type WithDataSource<T> = Omit<T, "options" | "loading"> & {
  datasetKey: DatasetKey;
  queryOptions?: UseDatasetOptions;
};

type SelectDataSourceProps =
  | WithDataSource<SingleSelectProps>
  | WithDataSource<MultiSelectProps>;

export function SelectDataSource(props: SelectDataSourceProps) {
  const { datasetKey, queryOptions, ...rest } = props;

  const { data, isLoading } = useDataset<SelectOption[]>(
    datasetKey,
    queryOptions,
  );

  return <SelectRoot {...rest} options={data ?? []} loading={isLoading} />;
}
