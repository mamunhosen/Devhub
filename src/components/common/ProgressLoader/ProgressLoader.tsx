import React from "react";
import { LinearProgress } from "@mui/material";

import { ProgressLoaderContainer } from "./ProgressLoader.styles";

interface ProgressLoaderProps {
  loading: boolean;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <ProgressLoaderContainer>
      <LinearProgress />
    </ProgressLoaderContainer>
  );
};

export { ProgressLoader as default, ProgressLoader };
