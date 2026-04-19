import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export const StyledClearIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: "45%",
  transform: "translateY(-50%)",
  padding: theme.spacing(0.25),
  zIndex: 2,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
