// theme/createTheme.ts
import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

import { getPalette } from "./palette";
import breakpoints from "./breakpoints";
import components from "./components";
import typography from "./typography";

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    spacing: 8,
    palette: getPalette(mode),
    breakpoints,
    components,
    typography,
    shape: {
      borderRadius: 8,
    },
  });
