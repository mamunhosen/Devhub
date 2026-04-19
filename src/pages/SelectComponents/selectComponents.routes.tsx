import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const SelectComponents = lazy(() => import("./SelectComponents"));

export const selectComponentsRoutes: RouteObject[] = [
  {
    index: true,
    element: <SelectComponents />,
  },
];
