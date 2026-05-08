import React from "react";
import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import {
  StyledHeader,
  DesktopNav,
  MobileNavActions,
} from "./Header.styles";
import { StyledNavLink } from "../../MainLayout.styles";
import { NAV_ITEMS } from "../../constants";

interface HeaderProps {
  themeIcon: React.ReactNode;
  onToggleTheme: () => void;
  onLogout: () => void;
  onOpenDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({
  themeIcon,
  onToggleTheme,
  onLogout,
  onOpenDrawer,
}) => {
  return (
    <StyledHeader>
      <Box fontWeight={600} fontSize="1.1rem">
        My App
      </Box>

      {/* Desktop Navigation */}
      <DesktopNav>
        {NAV_ITEMS.map((item) => (
          <StyledNavLink key={item.path} to={item.path} end={item.path === "/"}>
            {item.label}
          </StyledNavLink>
        ))}

        <IconButton
          onClick={onToggleTheme}
          color="inherit"
          aria-label="toggle theme"
        >
          {themeIcon}
        </IconButton>

        <IconButton onClick={onLogout} color="inherit" aria-label="logout">
          <LogoutIcon />
        </IconButton>
      </DesktopNav>

      {/* Mobile Navigation */}
      <MobileNavActions>
        <IconButton
          onClick={onToggleTheme}
          color="inherit"
          aria-label="toggle theme"
        >
          {themeIcon}
        </IconButton>

        <IconButton
          onClick={onOpenDrawer}
          color="inherit"
          aria-label="open drawer"
          edge="end"
        >
          <MenuIcon />
        </IconButton>
      </MobileNavActions>
    </StyledHeader>
  );
};

export default React.memo(Header);
