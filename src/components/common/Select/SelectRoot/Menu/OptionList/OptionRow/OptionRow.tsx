import React from "react";
import { ListItemText } from "@mui/material";

import type { OptionRowProps } from "./OptionRow.types";
import { StyledListItemButton, StyledCheckbox } from "./OptionRow.styles";

export const OptionRow: React.FC<OptionRowProps> = ({
  option,
  ref,
  isSelected,
  multiple,
  onClick,
  style,
}) => {
  return (
    <StyledListItemButton
      onClick={onClick}
      disabled={option.disabled}
      selected={isSelected}
      style={style}
    >
      {multiple && (
        <StyledCheckbox
          checked={isSelected}
          tabIndex={-1}
          disableRipple
          size="small"
        />
      )}
      <ListItemText primary={option.label} ref={ref} />
    </StyledListItemButton>
  );
};
