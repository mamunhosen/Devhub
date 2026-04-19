import selectComponentDatasets from "@/pages/SelectComponents/query.datasets";

export const datasetRegistry = {
  ...selectComponentDatasets,
};

export type DatasetKey = keyof typeof datasetRegistry;

export function getDatasetConfig(key: DatasetKey) {
  return datasetRegistry[key];
}
