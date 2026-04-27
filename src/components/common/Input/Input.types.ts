import type { ReactNode } from "react";
import type { InputBaseProps, FormControlProps } from "@mui/material";

export interface AppInputProps extends Omit<InputBaseProps, "error"> {
  name: string;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  loading?: boolean;
  formControlProps?: FormControlProps;
}
