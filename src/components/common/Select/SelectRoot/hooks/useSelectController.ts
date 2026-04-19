import { useCallback } from "react";

import type { SelectOption, SelectValue } from "../SelectRoot.types";

interface ControllerArgs {
  multiple: boolean;
  selectedOptions: SelectOption | SelectOption[] | undefined;
  onChange:
    | ((value: SelectValue | null) => void)
    | ((value: SelectValue[]) => void);
  onClose: () => void;
}

export function useSelectController({
  multiple,
  selectedOptions,
  onChange,
  onClose,
}: ControllerArgs) {
  const handleOptionChange = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;

      if (multiple) {
        const current = Array.isArray(selectedOptions) ? selectedOptions : [];

        const exists = current.some((v) => v.value === option.value);

        const newValue = exists
          ? current.filter((v) => v.value !== option.value).map((v) => v.value)
          : [...current.map((v) => v.value), option.value];

        (onChange as (v: SelectValue[]) => void)(newValue);
      } else {
        (onChange as (v: SelectValue | null) => void)(option.value);
        onClose();
      }
    },
    [multiple, selectedOptions, onChange, onClose],
  );

  const handleOptionDelete = useCallback(
    (option: SelectOption) => {
      if (!multiple || !Array.isArray(selectedOptions)) return;

      const newValue = selectedOptions
        .filter((v) => v.value !== option.value)
        .map((v) => v.value);

      (onChange as (v: SelectValue[]) => void)(newValue);
    },
    [multiple, selectedOptions, onChange],
  );

  const handleClearValue = useCallback(() => {
    if (multiple) {
      (onChange as (v: SelectValue[]) => void)([]);
    } else {
      (onChange as (v: SelectValue | null) => void)(null);
    }
  }, [multiple, onChange]);

  return { handleOptionChange, handleOptionDelete, handleClearValue };
}
