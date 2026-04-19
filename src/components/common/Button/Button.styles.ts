import { Button, LinearProgress, styled, alpha } from "@mui/material";

export const StyledButton = styled(Button)(({
  theme: { spacing, typography, shadows, palette },
  color,
}) => {
  let safeColor = color === "inherit" || !color ? "primary" : color;
  safeColor = palette[safeColor] ? safeColor : "primary";

  return {
    position: "relative",
    height: spacing(4.5),
    minWidth: spacing(16),
    maxWidth: "max-content",
    fontWeight: typography.fontWeightRegular,
    textTransform: "none",
    boxShadow: shadows[0],
    "&.Mui-disabled": {
      cursor: "not-allowed",
      pointerEvents: "auto",
    },
    "&.MuiButton-contained": {
      color: palette[safeColor]?.contrastText,
      backgroundColor: palette[safeColor]?.main,
      "&:hover": {
        backgroundColor: palette[safeColor]?.dark,
      },
      "&.Mui-disabled": {
        backgroundColor: alpha(palette[safeColor]?.light, 0.4),
      },
    },
    "&.MuiButton-outlined": {
      backgroundColor: palette.primary.contrastText,
      color: palette[safeColor]?.main,
      border: `1px solid ${palette[safeColor]?.main}`,
      "&:hover": {
        backgroundColor: alpha(palette[safeColor]?.dark, 0.1),
        border: `1px solid ${palette[safeColor]?.dark}`,
      },
      "&.Mui-disabled": {
        backgroundColor: alpha(palette[safeColor]?.light, 0.1),
        color: palette.grey[500],
        border: `1px solid ${palette[safeColor]?.light}`,
      },
    },
  };
});

export const StyledLinearProgress = styled(LinearProgress)(
  ({ theme: { shape } }) => ({
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    borderBottomLeftRadius: shape.borderRadius,
    borderBottomRightRadius: shape.borderRadius,
  }),
);
