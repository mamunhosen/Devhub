import { Outlet, NavLink } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useColorMode } from "@/app/useColorMode";

const Root = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Nav = styled("nav")({
  display: "flex",
  alignItems: "center",
  gap: 24,
  marginLeft: "auto",
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: 500,
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease",

  "&.active": {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Main = styled("main")(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
}));

const MainLayout = () => {
  const { mode, toggleMode } = useColorMode();

  const isDark = mode === "dark";

  return (
    <Root>
      <Header>
        <Box fontWeight={600}>My App</Box>

        <Nav>
          <StyledNavLink to="/" end>
            Select Components
          </StyledNavLink>

          <StyledNavLink to="/buttons">Buttons</StyledNavLink>

          {/* Color Mode Toggle */}
          <IconButton onClick={toggleMode} color="inherit" sx={{ ml: 1 }}>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Nav>
      </Header>

      <Main>
        <Outlet />
      </Main>
    </Root>
  );
};

export default MainLayout;
