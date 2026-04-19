import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

import { StyledClearIconButton } from "./SelectCancelableIcon.styles";
import { type SelectCancelableIconProps } from "./SelectCancelableIcon.types";

export const SelectCancelableIcon: React.FC<SelectCancelableIconProps> = ({
  onClear,
  ...props
}) => {
  return (
    <StyledClearIconButton
      size="small"
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
    >
      <ClearIcon fontSize="medium" />
    </StyledClearIconButton>
  );
};
