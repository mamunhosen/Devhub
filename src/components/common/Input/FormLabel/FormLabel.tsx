import React from "react";
import { FormLabelProps } from "@mui/material";
import { StyledFormLabel } from "./FormLabel.styles";

const AppFormLabel: React.FC<FormLabelProps> = (props) => {
  return <StyledFormLabel {...props} />;
};

export default AppFormLabel;
