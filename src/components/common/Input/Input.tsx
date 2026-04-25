import React from "react";
import { FormControl, InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

// local
import { type AppInputProps } from "./Input.types";
import { StyledInputBase } from "./Input.styles";
import FormLabel from "./FormLabel";
import FormHelperText from "./FormHelperText";
import ProgressBar from "./ProgressBar";

const AppInput: React.FC<AppInputProps> = ({
  label,
  helperText,
  error,
  loading,
  disabled,
  startAdornment,
  endAdornment,
  formControlProps,
  ...rest
}) => {
  const isFieldDisabled = disabled || loading;

  return (
    <FormControl
      fullWidth
      error={error}
      disabled={isFieldDisabled}
      {...formControlProps}
      sx={{ position: "relative", ...formControlProps?.sx }}
    >
      {label && <FormLabel error={error}>{label}</FormLabel>}

      <StyledInputBase
        {...rest}
        error={error}
        disabled={isFieldDisabled}
        startAdornment={startAdornment}
        endAdornment={
          <>
            {endAdornment}
            {isFieldDisabled && (
              <InputAdornment position="end">
                <LockIcon fontSize="small" color="disabled" />
              </InputAdornment>
            )}
          </>
        }
      />

      {loading && <ProgressBar color={error ? "error" : "primary"} />}

      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export { AppInput as default, AppInput };
