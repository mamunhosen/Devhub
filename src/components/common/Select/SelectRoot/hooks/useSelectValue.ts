import { useMemo } from "react";

import type { SelectValue, SelectOption } from "../SelectRoot.types";

export const useSelectValue = (
  value: SelectValue | SelectValue[] | undefined | null,
  options: SelectOption[],
  multiple: boolean,
) => {
  const selectedValues = useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }, [value]);

  const selectedOptions = useMemo(() => {
    if (!multiple) {
      return options?.find((option) => option.value === selectedValues[0]);
    }
    return options?.filter((option) => selectedValues.includes(option.value));
  }, [options, selectedValues, multiple]);

  return { selectedValues, selectedOptions };
};
