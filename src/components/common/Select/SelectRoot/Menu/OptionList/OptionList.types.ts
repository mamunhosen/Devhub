import type { SelectOption } from "../../SelectRoot.types";

export interface OptionListProps {
  options: SelectOption[];
  selectedValues: (string | number)[];
  multiple: boolean;
  onOptionClick: (option: SelectOption) => void;
  shouldObserve: boolean;
  onLoadMore?: () => void;
  listMaxNoOfItems: number;
}
