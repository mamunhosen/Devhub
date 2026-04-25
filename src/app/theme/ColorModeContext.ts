// ColorModeContext.ts
import { createContext } from "react";

export type ColorMode = "light" | "dark";

export type ColorModeContextValue = {
  mode: ColorMode;
  toggleMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextValue | null>(
  null,
);
