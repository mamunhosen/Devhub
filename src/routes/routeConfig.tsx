import type { RouteObject } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import { selectComponentsRoutes } from "@/pages/SelectComponents/selectComponents.routes";
import { buttonRoutes } from "@/pages/Buttons/buttons.routes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [...selectComponentsRoutes, ...buttonRoutes],
  },
];

export default routes;
