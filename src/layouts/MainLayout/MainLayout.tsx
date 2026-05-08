import React, { useCallback, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useColorMode } from "@/app/theme";
import { useAuth } from "@/app/auth";

import { Root, Main } from "./MainLayout.styles";
import { Header, MobileDrawer } from "./components";

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

  return (
    <Root>
      <Header
        themeIcon={themeIcon}
        onToggleTheme={toggleMode}
        onLogout={handleLogout}
        onOpenDrawer={openDrawer}
      />

      <MobileDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        onLogout={handleLogout}
      />

      <Main>
        <Outlet />
      </Main>
    </Root>
  );
};

export default React.memo(MainLayout);
