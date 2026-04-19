import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Buttons = lazy(() => import("./Buttons"));

export const buttonRoutes: RouteObject[] = [
  {
    path: "buttons",
    element: <Buttons />,
  },
];
