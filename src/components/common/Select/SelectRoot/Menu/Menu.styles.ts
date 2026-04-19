import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const MenuPaper = styled(Paper)(({ theme: { spacing, shadows } }) => ({
  marginTop: spacing(0.5),
  maxHeight: spacing(60),
  overflow: "hidden",
  boxShadow: shadows[8],
  position: "relative",
}));
