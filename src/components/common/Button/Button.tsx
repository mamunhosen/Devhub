import React from "react";

// mui
import { CircularProgress } from "@mui/material";

// local
import { type AppButtonProps } from "./Button.types";
import { StyledButton, StyledLinearProgress } from "./Button.styles";

const AppButton: React.FC<AppButtonProps> = ({
  loading = null,
  loader = "linear",
  variant = "contained",
  color = "primary",
  disabled = false,
  children,
  startIcon,
  ...rest
}) => {
  const isDisabled = disabled || !!loading;

  return (
    <StyledButton
      {...rest}
      variant={variant}
      color={color}
      disabled={isDisabled}
      startIcon={
        loading && loader === "circular" ? (
          <CircularProgress size={18} color={color} />
        ) : (
          startIcon
        )
      }
    >
      {children}
      {loading && loader === "linear" && <StyledLinearProgress color={color} />}
    </StyledButton>
  );
};

export { AppButton as default, AppButton };
