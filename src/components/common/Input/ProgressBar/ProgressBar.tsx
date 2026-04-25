import React from "react";
import { LinearProgressProps } from "@mui/material";
import { StyledProgressBar } from "./ProgressBar.styles";

const AppProgressBar: React.FC<LinearProgressProps> = (props) => {
  return <StyledProgressBar {...props} />;
};

export default AppProgressBar;
