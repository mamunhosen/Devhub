import type { SelectOption } from "../../../SelectRoot.types";

export interface OptionRowProps {
  option: SelectOption;
  ref?: React.Ref<HTMLLIElement>;
  isSelected: boolean;
  multiple: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}
