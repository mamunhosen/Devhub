import { styled } from "@mui/material/styles";
import { Box, List } from "@mui/material";

export const OptionListContainer = styled(Box)(
  ({ theme: { spacing, palette, shape } }) => ({
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",

    "&::-webkit-scrollbar": {
      width: spacing(1),
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: palette.action.hover,
      borderRadius: parseFloat(String(shape.borderRadius)) / 2,
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: palette.action.selected,
      borderRadius: parseFloat(String(shape.borderRadius)) / 2,

      "&:hover": {
        backgroundColor: palette.action.disabled,
      },
    },
  }),
);

export const StyledOptionList = styled(List)({
  position: "relative",
  padding: 0,
});

export const OptionListWrapper = styled(Box)({
  willChange: "transform",
});

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `0px ${theme.spacing(2)}`,
  textAlign: "center",
}));
