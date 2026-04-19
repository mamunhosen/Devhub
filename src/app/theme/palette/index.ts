import {
  darken,
  lighten,
  type PaletteMode,
  type PaletteOptions,
} from "@mui/material";

import common from "./common";
import light from "./light";
import dark from "./dark";

const modeMap = {
  light,
  dark,
};

export const getPalette = (mode: PaletteMode): PaletteOptions => {
  const colors = modeMap[mode];

  return {
    mode,

    primary: {
      main: common.primary,
      light: lighten(common.primary, 0.4),
      dark: darken(common.primary, 0.15),
    },
    secondary: {
      main: common.secondary,
      light: lighten(common.secondary, 0.4),
      dark: darken(common.secondary, 0.15),
    },
    success: {
      main: common.success,
      light: lighten(common.success, 0.4),
      dark: darken(common.success, 0.15),
    },
    warning: {
      main: common.warning,
      light: lighten(common.warning, 0.4),
      dark: darken(common.warning, 0.15),
    },
    error: {
      main: common.error,
      light: lighten(common.error, 0.4),
      dark: darken(common.error, 0.15),
    },
    info: {
      main: common.info,
      light: lighten(common.info, 0.4),
      dark: darken(common.info, 0.15),
    },

    background: {
      default: colors.background,
      paper: colors.surface,
    },

    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },

    border: {
      main: colors.border,
      light: lighten(colors.border, 0.4),
      dark: darken(colors.border, 0.2),
    },

    surface: {
      main: colors.surface,
      light: lighten(colors.surface, 0.4),
      dark: darken(colors.surface, 0.2),
    },

    brand: {
      main: common.brand,
      light: lighten(common.brand, 0.4),
      dark: darken(common.brand, 0.15),
    },

    divider: colors.border,
  };
};
