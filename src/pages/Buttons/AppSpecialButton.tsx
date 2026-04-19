import { styled } from "@mui/material";

import { AppButton } from "@/components/common";

const AppSpecialButton = styled(AppButton)(({ theme }) => ({
  minWidth: theme.spacing(30),
}));

export default AppSpecialButton;
