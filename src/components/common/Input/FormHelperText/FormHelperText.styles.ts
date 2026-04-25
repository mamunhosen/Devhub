import { FormHelperText, styled } from "@mui/material";

export const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  fontSize: theme.typography.pxToRem(12),
  "&.Mui-error": {
    color: theme.palette.error.main,
  },
}));
