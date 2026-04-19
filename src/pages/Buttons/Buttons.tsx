import { styled, Box } from "@mui/material";

import { AppButton } from "@/components/common";

import AppSpecialButton from "./AppSpecialButton";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

const Buttons: React.FC = () => {
  return (
    <StyledBox>
      <AppButton>Primary</AppButton>
      <AppButton disabled>Primary Disabled</AppButton>
      <AppButton variant="outlined">Primary Outlined</AppButton>
      <AppButton variant="outlined" disabled>
        Primary Outlined Disabled
      </AppButton>
      <AppButton variant="outlined" color="secondary">
        Secondary Outlined
      </AppButton>
      <AppButton variant="outlined" color="secondary" disabled>
        Secondary Outlined Disabled
      </AppButton>
      <AppButton color="success">Success</AppButton>
      <AppButton color="success" disabled>
        Success Disabled
      </AppButton>
      <AppButton color="success" variant="outlined">
        Success Outlined
      </AppButton>
      <AppButton color="success" variant="outlined" disabled>
        Success Outlined Disabled
      </AppButton>
      <AppButton color="info">Info</AppButton>
      <AppButton color="info" disabled>
        Info Disabled
      </AppButton>
      <AppButton color="warning">Warning</AppButton>
      <AppButton color="warning" disabled>
        Warning Disabled
      </AppButton>
      <AppButton color="error">Error</AppButton>
      <AppButton color="error" disabled>
        Error Disabled
      </AppButton>
      <AppSpecialButton color="secondary">Custom Button</AppSpecialButton>
      <AppSpecialButton color="secondary" disabled>
        Custom Button Disabled
      </AppSpecialButton>
    </StyledBox>
  );
};

export default Buttons;
