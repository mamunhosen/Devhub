import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const SelectInputBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "hasError" && prop !== "isDisabled" && prop !== "hasLabel",
})<{
  hasError?: boolean;
  isDisabled?: boolean;
  hasLabel?: boolean;
}>(({ theme, hasError, isDisabled, hasLabel }) => ({
  marginTop: hasLabel ? theme.spacing(2) : 0,
  border: `1px solid ${hasError ? theme.palette.error.main : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  minHeight: 56,
  cursor: isDisabled ? "not-allowed" : "pointer",
  backgroundColor: isDisabled
    ? theme.palette.action.disabledBackground
    : theme.palette.background.paper,
  position: "relative",
  transition: "border-color 0.2s",

  "&:hover": {
    borderColor: hasError
      ? theme.palette.error.main
      : theme.palette.primary.main,
  },

  "&:focus-within": {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
}));
