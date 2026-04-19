import React from "react";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  ClickAwayListener,
} from "@mui/material";

import type { SelectProps } from "./SelectRoot.types";
import {
  useSelectSearch,
  useSelectValue,
  useSelectController,
  useSelectDropdown,
} from "./hooks";

import { SelectContainer } from "./SelectRoot.styles";
import { SelectTrigger } from "./SelectTrigger";
import { Menu } from "./Menu";

export const SelectRoot: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  multiple = false,
  searchable = true,
  pagination = false,
  allowCreateOption = false,
  loading = false,
  onLoadMore,
  onSearch,
  hasMore = false,
  isFetchingNextPage = false,
  searchFromServer = false,
  onCreateOption,
  createOptionLabel,
  label,
  placeholder = "Select...",
  error = false,
  helperText,
  disabled = false,
  fullWidth = true,
  id,
  required = false,
  isCancellable = true,
  listMaxNoOfItems = 5,
}) => {
  const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
  const shouldRenderCancelButton = isCancellable && hasValue;

  const dropdown = useSelectDropdown(disabled);
  const { searchTerm, handleSearchChange, filteredOptions } = useSelectSearch(
    options,
    searchFromServer,
    onSearch,
  );
  const { selectedValues, selectedOptions } = useSelectValue(
    value,
    options,
    multiple,
  );

  const { handleOptionChange, handleOptionDelete, handleClearValue } =
    useSelectController({
      selectedOptions,
      multiple,
      onChange,
      onClose: dropdown.close,
    });

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      required={required}
    >
      {label && (
        <InputLabel shrink htmlFor={id}>
          {label}
        </InputLabel>
      )}

      <ClickAwayListener onClickAway={dropdown.close}>
        <SelectContainer
          ref={(node: HTMLDivElement | null) =>
            dropdown.setAnchorElementRef(node)
          }
        >
          <SelectTrigger
            onClick={dropdown.open}
            selectedOptions={selectedOptions}
            multiple={multiple}
            placeholder={placeholder}
            loading={loading}
            error={error}
            disabled={disabled}
            hasLabel={!!label}
            onDelete={multiple ? handleOptionDelete : undefined}
            shouldRenderCancelButton={shouldRenderCancelButton}
            onClear={handleClearValue}
          />

          <Menu
            open={dropdown.isOpen}
            anchorEl={dropdown.anchorEl}
            width={dropdown.dropdownWidth}
            searchable={searchable}
            disabled={disabled}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            options={filteredOptions}
            selectedValues={selectedValues}
            multiple={multiple}
            onOptionClick={handleOptionChange}
            isFetchingNextPage={isFetchingNextPage}
            hasMore={pagination && hasMore}
            onLoadMore={pagination ? onLoadMore : undefined}
            allowCreateOption={allowCreateOption}
            onCreateOption={onCreateOption}
            createOptionLabel={createOptionLabel}
            listMaxNoOfItems={listMaxNoOfItems}
          />
        </SelectContainer>
      </ClickAwayListener>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
