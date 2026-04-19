import type { SelectOption } from "../SelectRoot.types";

export interface MenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  width: number;
  searchable: boolean;
  disabled: boolean;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  options: SelectOption[];
  selectedValues: (string | number)[];
  multiple: boolean;
  onOptionClick: (option: SelectOption) => void;
  isFetchingNextPage: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  allowCreateOption?: boolean;
  onCreateOption?: () => void;
  createOptionLabel?: string;
  listMaxNoOfItems: number;
}
