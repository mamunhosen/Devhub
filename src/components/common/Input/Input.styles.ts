import { InputBase, styled, alpha } from "@mui/material";

export const StyledInputBase = styled(InputBase)(({ theme, error }) => ({
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: error
      ? theme.palette.error.main
      : theme.palette.mode === "light"
        ? "#E0E3E7"
        : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(error ? theme.palette.error.main : theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    },
  },
  "&.Mui-disabled": {
    "& .MuiInputBase-input": {
      backgroundColor: theme.palette.action.disabledBackground,
      cursor: "not-allowed",
    },
  },
  // When using adornments, we need to adjust the padding and border
  "&.MuiInputBase-adornedStart": {
    paddingLeft: theme.spacing(1),
  },
  "&.MuiInputBase-adornedEnd": {
    paddingRight: theme.spacing(1),
  },
  "& .MuiInputBase-inputAdornedStart": {
    paddingLeft: theme.spacing(1),
  },
  "& .MuiInputBase-inputAdornedEnd": {
    paddingRight: theme.spacing(1),
  },
}));
