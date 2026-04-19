import { type IconButtonProps } from "@mui/material";

export interface SelectCancelableIconProps extends Partial<IconButtonProps> {
  onClear: () => void;
}
