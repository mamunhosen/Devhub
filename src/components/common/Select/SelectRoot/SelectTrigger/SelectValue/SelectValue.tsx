import React from "react";

import { Typography } from "@mui/material";

import type { SelectOption } from "../../SelectRoot.types";
import { ChipContainer, StyledChip } from "./SelectValue.styles";

interface SelectValueProps {
  selectedOptions: SelectOption | SelectOption[] | null | undefined;
  multiple: boolean;
  placeholder?: string;
  onDelete?: (option: SelectOption) => void;
}

export const SelectValue: React.FC<SelectValueProps> = ({
  selectedOptions,
  multiple,
  placeholder = "Select...",
  onDelete,
}) => {
  if (
    !selectedOptions ||
    (Array.isArray(selectedOptions) && selectedOptions.length === 0)
  ) {
    return (
      <Typography variant="body2" color="text.secondary">
        {placeholder}
      </Typography>
    );
  }

  if (multiple && Array.isArray(selectedOptions)) {
    return (
      <ChipContainer>
        {selectedOptions.map((option) => (
          <StyledChip
            key={option.value}
            label={option.label}
            size="small"
            onDelete={() => onDelete?.(option)}
          />
        ))}
      </ChipContainer>
    );
  }

  if (!Array.isArray(selectedOptions)) {
    return (
      <Typography variant="body2" noWrap>
        {selectedOptions.label}
      </Typography>
    );
  }

  return null;
};
