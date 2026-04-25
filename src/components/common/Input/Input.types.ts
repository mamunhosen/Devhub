import { ReactNode } from "react";
import { InputBaseProps, FormControlProps } from "@mui/material";

export interface AppInputProps extends Omit<InputBaseProps, "error"> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  loading?: boolean;
  formControlProps?: FormControlProps;
}
