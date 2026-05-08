import { FormLabel, styled } from "@mui/material";

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  "&.Mui-focused": {
    color: theme.palette.text.primary,
  },
  "&.Mui-error": {
    color: theme.palette.error.main,
  },
}));
