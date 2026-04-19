import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  CreateOptionActionContainer,
  StyledAddButton,
} from "./CreateOptionAction.styles";

interface CreateOptionActionProps {
  onClick: () => void;
  label?: string;
}

export const CreateOptionAction: React.FC<CreateOptionActionProps> = ({
  onClick,
  label = "Add new Option",
}) => {
  return (
    <CreateOptionActionContainer>
      <StyledAddButton
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onClick}
        size="small"
      >
        {label}
      </StyledAddButton>
    </CreateOptionActionContainer>
  );
};
