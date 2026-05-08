import { Box, styled } from "@mui/material";

export const DrawerContainer = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const DrawerFooter = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));
