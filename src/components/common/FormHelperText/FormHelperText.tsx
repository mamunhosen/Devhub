import React from "react";
import { type FormHelperTextProps } from "@mui/material";

import { StyledFormHelperText } from "./FormHelperText.styles";

const AppFormHelperText: React.FC<FormHelperTextProps> = (props) => {
  return <StyledFormHelperText {...props} />;
};

export default AppFormHelperText;
