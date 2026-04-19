export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type SelectValue = string | number;

interface BaseSelectProps {
  options: SelectOption[];

  searchable?: boolean;
  pagination?: boolean;
  allowCreateOption?: boolean;
  loading?: boolean;
  isFetchingNextPage?: boolean;

  hasMore?: boolean;
  onLoadMore?: () => void;

  searchFromServer?: boolean;
  onSearch?: (searchTerm: string) => void;

  onCreateOption?: () => void;
  createOptionLabel?: string;

  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;

  id?: string;
  name?: string;
  required?: boolean;

  isCancellable?: boolean;
  listMaxNoOfItems?: number;
}

export interface SingleSelectProps extends BaseSelectProps {
  multiple?: false;
  value?: SelectValue | null;
  onChange: (value: SelectValue | null) => void;
}

export interface MultiSelectProps extends BaseSelectProps {
  multiple?: true;
  value?: SelectValue[];
  onChange: (value: SelectValue[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;
