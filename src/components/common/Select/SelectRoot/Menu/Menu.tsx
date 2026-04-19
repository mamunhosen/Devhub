import { Popper, Grow } from "@mui/material";

import ProgressLoader from "@/components/common/ProgressLoader";

import { MenuPaper } from "./Menu.styles";
import { SearchField } from "./SearchField";
import { OptionList } from "./OptionList";
import { CreateOptionAction } from "./CreateOptionAction";
import type { MenuProps } from "./Menu.types";

export const Menu: React.FC<MenuProps> = ({
  open,
  anchorEl,
  width,
  searchable,
  disabled,
  searchTerm,
  onSearchChange,
  options,
  selectedValues,
  multiple,
  onOptionClick,
  isFetchingNextPage,
  hasMore,
  onLoadMore,
  allowCreateOption,
  onCreateOption,
  createOptionLabel,
  listMaxNoOfItems,
}) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      transition
      style={{ width, zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} timeout={200}>
          <MenuPaper elevation={8}>
            {searchable && (
              <SearchField
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                disabled={disabled}
              />
            )}

            <OptionList
              options={options}
              selectedValues={selectedValues}
              multiple={multiple}
              onOptionClick={onOptionClick}
              shouldObserve={!!hasMore && !isFetchingNextPage}
              onLoadMore={onLoadMore}
              listMaxNoOfItems={listMaxNoOfItems}
            />

            <ProgressLoader loading={isFetchingNextPage} />
            {allowCreateOption && onCreateOption && (
              <CreateOptionAction
                onClick={onCreateOption}
                label={createOptionLabel}
              />
            )}
          </MenuPaper>
        </Grow>
      )}
    </Popper>
  );
};
