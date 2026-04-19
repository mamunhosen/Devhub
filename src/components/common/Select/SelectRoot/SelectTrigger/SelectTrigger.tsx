import ProgressLoader from "@/components/common/ProgressLoader";

import { SelectInputBox } from "./SelectTrigger.styles";
import { SelectValue } from "./SelectValue";
import type { SelectOption } from "../SelectRoot.types";
import { SelectCancelableIcon } from "./SelectCancelableIcon";

interface SelectTriggerProps {
  onClick: () => void;
  selectedOptions: SelectOption | SelectOption[] | null | undefined;
  multiple: boolean;
  placeholder?: string;
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
  hasLabel?: boolean;
  onDelete?: (option: SelectOption) => void;
  shouldRenderCancelButton: boolean;
  onClear: () => void;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  onClick,
  selectedOptions,
  multiple,
  placeholder,
  loading = false,
  error,
  disabled,
  hasLabel,
  onDelete,
  shouldRenderCancelButton,
  onClear,
}) => (
  <SelectInputBox
    onClick={onClick}
    hasError={error}
    isDisabled={disabled}
    hasLabel={hasLabel}
  >
    <ProgressLoader loading={loading} />
    <SelectValue
      selectedOptions={selectedOptions}
      multiple={multiple}
      placeholder={placeholder}
      onDelete={onDelete}
    />
    {shouldRenderCancelButton && <SelectCancelableIcon onClear={onClear} />}
  </SelectInputBox>
);
