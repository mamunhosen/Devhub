import { SelectInputBox } from "./SelectTrigger.styles";
import ProgressBar from "../../../ProgressBar";
import { SelectValue } from "./SelectValue";
import type { SelectOption } from "../SelectRoot.types";
import { SelectCancelableIcon } from "./SelectCancelableIcon";

interface SelectTriggerProps {
  id: string;
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
  id,
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
    id={id}
  >
    {loading && <ProgressBar color={error ? "error" : "primary"} />}
    <SelectValue
      selectedOptions={selectedOptions}
      multiple={multiple}
      placeholder={placeholder}
      onDelete={onDelete}
    />
    {shouldRenderCancelButton && <SelectCancelableIcon onClear={onClear} />}
  </SelectInputBox>
);
