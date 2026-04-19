import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import routes from "./routeConfig";

const AppRoutes = () => {
  const element = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <CircularProgress color="primary" size={120} />
        </Box>
      }
    >
      {element}
    </Suspense>
  );
};

export default AppRoutes;
