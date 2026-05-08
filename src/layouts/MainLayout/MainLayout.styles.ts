import { Box, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Root = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const Main = styled("main")(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: 500,
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease",
  display: "inline-block",

  "&.active": {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
