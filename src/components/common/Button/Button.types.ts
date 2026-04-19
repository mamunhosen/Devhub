import { type ButtonProps } from "@mui/material";

export type LoaderType = "circular" | "linear";

export interface AppButtonProps extends ButtonProps {
  /**
   * Loader style when loading is true
   * @default 'circular'
   */
  loader?: LoaderType;
}
