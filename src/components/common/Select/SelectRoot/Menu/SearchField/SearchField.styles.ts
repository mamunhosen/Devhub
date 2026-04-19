import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

export const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const StyledSearchField = styled(TextField)(
  ({ theme: { spacing, palette } }) => ({
    marginBottom: spacing(1),

    "& .MuiOutlinedInput-root": {
      backgroundColor: palette.background.paper,
    },
  }),
);
