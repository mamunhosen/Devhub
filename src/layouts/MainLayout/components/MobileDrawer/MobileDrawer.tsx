import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { DrawerContainer, DrawerFooter } from "./MobileDrawer.styles";
import { StyledNavLink } from "../../MainLayout.styles";
import { NAV_ITEMS } from "../../constants";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  onLogout,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 250,
          },
        },
      }}
    >
      <DrawerContainer role="presentation">
        <List sx={{ mt: 2, px: 2 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <StyledNavLink
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                sx={{ width: "100%", boxSizing: "border-box" }}
              >
                {item.label}
              </StyledNavLink>
            </ListItem>
          ))}
        </List>

        <DrawerFooter>
          <ListItem disablePadding>
            <ListItemButton
              onClick={onLogout}
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
  );
};

export default React.memo(MobileDrawer);
