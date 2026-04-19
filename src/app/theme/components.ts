import Raleway300 from "@/assets/fonts/raleway/Raleway-Light.ttf";
import Raleway400 from "@/assets/fonts/raleway/Raleway-Regular.ttf";
import Raleway500 from "@/assets/fonts/raleway/Raleway-Medium.ttf";
import Raleway600 from "@/assets/fonts/raleway/Raleway-SemiBold.ttf";
import Raleway700 from "@/assets/fonts/raleway/Raleway-Bold.ttf";
import RalewayItalic from "@/assets/fonts/raleway/Raleway-Italic.ttf";

const createFontFace = (
  weight: number,
  src: string,
  style: "normal" | "italic" = "normal",
) => ({
  fontFamily: "Raleway",
  fontStyle: style,
  fontDisplay: "swap",
  fontWeight: weight,
  src: `url(${src}) format("truetype")`,
});

export default {
  MuiCssBaseline: {
    styleOverrides: {
      "@font-face": createFontFace(400, Raleway400),
      fallbacks: [
        {
          "@font-face": createFontFace(300, Raleway300),
        },
        {
          "@font-face": createFontFace(500, Raleway500),
        },
        {
          "@font-face": createFontFace(600, Raleway600),
        },
        {
          "@font-face": createFontFace(700, Raleway700),
        },
        {
          "@font-face": createFontFace(400, RalewayItalic, "italic"),
        },
      ],
    },
  },
};
