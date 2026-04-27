import { InputBase, styled, alpha, FormControl } from "@mui/material";

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  position: "relative",
  marginBottom: theme.spacing(1),
}));

export const StyledInputBase = styled(InputBase)(
  ({ theme: { spacing, palette, shape, typography, transitions }, error }) => ({
    borderRadius: shape.borderRadius,
    backgroundColor: palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: error
      ? palette.error.main
      : palette.mode === "light"
        ? "#E0E3E7"
        : "#2D3843",
    transition: transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&.Mui-focused": {
      boxShadow: `${alpha(
        error ? palette.error.main : palette.primary.main,
        0.25,
      )} 0 0 0 0.2rem`,
      borderColor: error ? palette.error.main : palette.primary.main,
    },

    "&.Mui-disabled": {
      backgroundColor: palette.action.disabledBackground,
      cursor: "not-allowed",
    },

    "& .MuiInputBase-input": {
      fontSize: typography.pxToRem(16),
      width: "100%",
      padding: spacing(1.25),
      "&.Mui-disabled": {
        cursor: "not-allowed",
      },
    },

    // When using adornments, we need to adjust the padding
    "&.MuiInputBase-adornedStart": {
      paddingLeft: spacing(1.5),
    },
    "&.MuiInputBase-adornedEnd": {
      paddingRight: spacing(1.5),
    },
    "& .MuiInputBase-inputAdornedStart": {
      paddingLeft: spacing(1),
    },
    "& .MuiInputBase-inputAdornedEnd": {
      paddingRight: spacing(1),
    },
  }),
);
