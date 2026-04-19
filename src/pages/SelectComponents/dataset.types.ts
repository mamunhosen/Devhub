interface BaseDataset {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export type Organization = BaseDataset;

export interface Branch extends BaseDataset {
  location: string;
}
