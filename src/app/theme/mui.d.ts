import "@mui/material/styles";
import "@mui/material/Button";
import "@mui/material/LinearProgress";
import "@mui/material/CircularProgress";

declare module "@mui/material/styles" {
  interface Palette {
    border: Palette["primary"];
    surface: Palette["primary"];
    brand: Palette["primary"];
  }

  interface PaletteOptions {
    border?: PaletteOptions["primary"];
    surface?: PaletteOptions["primary"];
    brand?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    brand: true;
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    brand: true;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    brand: true;
  }
}
