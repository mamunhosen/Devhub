import { Box, styled } from "@mui/material";

import { AppButton } from "@/components/common/Button";

export const CreateOptionActionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const StyledAddButton = styled(AppButton)({
  width: "100%",
  justifyContent: "flex-start",
  borderStyle: "dashed",
});
