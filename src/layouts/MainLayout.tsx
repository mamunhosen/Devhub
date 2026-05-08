import React, { useCallback, useMemo, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import { useColorMode } from "@/app/theme";
import { useAuth } from "@/app/auth";

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
  backgroundColor: theme.palette.background.paper,
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const Nav = styled("nav")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginLeft: "auto",

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MobileNav = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Main = styled("main")(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
}));

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

const DrawerContainer = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const DrawerFooter = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const NAV_ITEMS = [
  { label: "Select Components", path: "/" },
  { label: "Buttons", path: "/buttons" },
];

const MainLayout = () => {
  const { mode, toggleMode } = useColorMode();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDark = mode === "dark";

  const themeIcon = useMemo(
    () => (isDark ? <LightModeIcon /> : <DarkModeIcon />),
    [isDark],
  );

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    closeDrawer();
    logout();
    navigate("/login");
  }, [closeDrawer, logout, navigate]);

  const renderNavItems = useCallback(
    (onItemClick?: () => void) =>
      NAV_ITEMS.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            component={NavLink}
            to={item.path}
            end={item.path === "/"}
            onClick={onItemClick}
            sx={{
              "&.active": {
                color: "primary.main",
                bgcolor: "action.selected",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      )),
    [],
  );

  return (
    <Root>
      <Header>
        <Box fontWeight={600} fontSize="1.1rem">
          My App
        </Box>

        {/* Desktop Navigation */}
        <Nav>
          {NAV_ITEMS.map((item) => (
            <StyledNavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
            >
              {item.label}
            </StyledNavLink>
          ))}

          <IconButton
            onClick={toggleMode}
            color="inherit"
            aria-label="toggle theme"
          >
            {themeIcon}
          </IconButton>

          <IconButton
            onClick={handleLogout}
            color="inherit"
            aria-label="logout"
          >
            <LogoutIcon />
          </IconButton>
        </Nav>

        {/* Mobile Navigation */}
        <MobileNav>
          <IconButton
            onClick={toggleMode}
            color="inherit"
            aria-label="toggle theme"
          >
            {themeIcon}
          </IconButton>

          <IconButton
            onClick={openDrawer}
            color="inherit"
            aria-label="open drawer"
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        </MobileNav>
      </Header>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        slotProps={{
          paper: {
            sx: {
              width: 250,
            },
          },
        }}
      >
        <DrawerContainer role="presentation">
          <List sx={{ mt: 2 }}>{renderNavItems(closeDrawer)}</List>

          <DrawerFooter>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <LogoutIcon />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </DrawerFooter>
        </DrawerContainer>
      </Drawer>

      <Main>
        <Outlet />
      </Main>
    </Root>
  );
};

export default React.memo(MainLayout);
