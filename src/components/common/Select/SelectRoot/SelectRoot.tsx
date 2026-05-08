import React from "react";
import { FormControl, ClickAwayListener } from "@mui/material";

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
import FormLabel from "../../FormLabel";
import FormHelperText from "../../FormHelperText";

export const SelectRoot: React.FC<SelectProps> = ({
  options,
  name,
  value,
  onChange,
  multiple = false,
  searchable = true,
  pagination = false,
  allowCreateOption = false,
  loading = false,
  onLoadMore,
  hasMore = false,
  isFetchingNextPage = false,
  searchFromServer,
  debounceMs,
  onSearch,
  onCreateOption,
  createOptionLabel,
  label,
  placeholder = "Select...",
  error = false,
  helperText,
  disabled = false,
  fullWidth = true,
  required = false,
  isCancellable = true,
  listMaxNoOfItems = 5,
}) => {
  const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
  const shouldRenderCancelButton = isCancellable && hasValue;
  const id = `${name}-select`;

  const dropdown = useSelectDropdown(disabled);
  const { searchTerm, handleSearchChange, filteredOptions } = useSelectSearch(
    options,
    searchFromServer,
    onSearch,
    debounceMs,
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
        <FormLabel error={error} htmlFor={id} required={required}>
          {label}
        </FormLabel>
      )}

      <ClickAwayListener onClickAway={dropdown.close}>
        <SelectContainer
          ref={(node: HTMLDivElement | null) =>
            dropdown.setAnchorElementRef(node)
          }
        >
          <SelectTrigger
            id={id}
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

      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
