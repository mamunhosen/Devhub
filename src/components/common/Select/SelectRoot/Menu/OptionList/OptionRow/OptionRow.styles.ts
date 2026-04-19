import { styled } from "@mui/material/styles";
import { ListItemButton, Checkbox } from "@mui/material";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,

    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  marginRight: theme.spacing(1),
  padding: 0,
}));
