import { LinearProgress, styled } from "@mui/material";

export const StyledProgressBar = styled(LinearProgress)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  borderBottomLeftRadius: theme.shape.borderRadius,
  borderBottomRightRadius: theme.shape.borderRadius,
  zIndex: 1,
}));
