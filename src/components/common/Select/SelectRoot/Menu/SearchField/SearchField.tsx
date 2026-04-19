import React from "react";

// MUI
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// Local
import type { SearchFieldProps } from "./SearchField.types";
import { SearchContainer, StyledSearchField } from "./SearchField.styles";

export const SearchField: React.FC<SearchFieldProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  disabled = false,
}) => (
  <SearchContainer>
    <StyledSearchField
      fullWidth
      size="small"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  </SearchContainer>
);
