import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledHeader = styled("header")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

export const DesktopNav = styled("nav")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginLeft: "auto",

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const MobileNavActions = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
