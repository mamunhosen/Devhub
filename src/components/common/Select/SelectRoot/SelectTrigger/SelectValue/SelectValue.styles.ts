import { styled } from "@mui/material/styles";
import { Box, Chip } from "@mui/material";

export const ChipContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  maxWidth: theme.spacing(25),
}));
