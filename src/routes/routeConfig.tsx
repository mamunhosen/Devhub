import type { RouteObject } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

import { selectComponentsRoutes } from "@/pages/SelectComponents/selectComponents.routes";
import { buttonRoutes } from "@/pages/Buttons/buttons.routes";
import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import { ProtectedRoute, PublicRoute } from "./AuthRoutes";

const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [...selectComponentsRoutes, ...buttonRoutes],
      },
    ],
  },
];

export default routes;
