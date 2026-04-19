import React, { useMemo } from "react";

import { Typography } from "@mui/material";

import { useIntersectionObserver, useVirtualizer } from "@/libs/hooks";

import { OptionRow } from "./OptionRow";
import type { OptionListProps } from "./OptionList.types";
import {
  OptionListContainer,
  StyledOptionList,
  OptionListWrapper,
  EmptyStateContainer,
} from "./OptionList.styles";
import { DEFAULT_ROW_HEIGHT, DEFAULT_OVERSCAN } from "./constants";

export const OptionList: React.FC<OptionListProps> = ({
  options,
  selectedValues,
  multiple,
  onOptionClick,
  shouldObserve,
  onLoadMore,
  listMaxNoOfItems,
}) => {
  const { containerRef, targetRef } = useIntersectionObserver({
    shouldObserve,
    onIntersect: onLoadMore!,
    rootMargin: `${DEFAULT_ROW_HEIGHT}px`,
    threshold: 0.1,
  });

  const dropdownHeight = useMemo(() => {
    const visibleItemsCount = Math.max(
      1,
      Math.min(listMaxNoOfItems, options.length),
    );

    return visibleItemsCount * DEFAULT_ROW_HEIGHT;
  }, [options, listMaxNoOfItems]);

  const { visibleRange, totalHeight, offsetY, handleScroll } = useVirtualizer({
    totalItems: options.length,
    itemHeight: DEFAULT_ROW_HEIGHT,
    containerHeight: dropdownHeight,
    overscan: DEFAULT_OVERSCAN,
  });

  const visibleOptions = options.slice(
    visibleRange.startIndex,
    visibleRange.endIndex + 1,
  );

  const hasOptions = options.length > 0;

  return (
    <OptionListContainer
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: dropdownHeight }}
    >
      {hasOptions ? (
        <StyledOptionList sx={{ height: totalHeight }}>
          <OptionListWrapper sx={{ transform: `translateY(${offsetY}px)` }}>
            {visibleOptions.map((option, index) => {
              const actualIndex = visibleRange.startIndex + index;
              const isSelected = selectedValues.includes(option.value);
              const isLastItem = actualIndex === options.length - 1;

              return (
                <OptionRow
                  key={`${option.value}-${actualIndex}`}
                  ref={isLastItem ? targetRef : undefined}
                  option={option}
                  isSelected={isSelected}
                  multiple={multiple}
                  onClick={() => onOptionClick(option)}
                  style={{ height: DEFAULT_ROW_HEIGHT }}
                />
              );
            })}
          </OptionListWrapper>
        </StyledOptionList>
      ) : (
        <EmptyStateContainer>
          <Typography variant="body2" color="text.secondary">
            No options available
          </Typography>
        </EmptyStateContainer>
      )}
    </OptionListContainer>
  );
};
