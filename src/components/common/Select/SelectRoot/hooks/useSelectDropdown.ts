import { useState, useCallback, useLayoutEffect } from "react";

export function useSelectDropdown(disabled?: boolean) {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  const open = useCallback(() => {
    if (!disabled) setIsOpen(true);
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const setAnchorElementRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    setAnchorEl(node);
    setDropdownWidth(node.offsetWidth);
  }, []);

  useLayoutEffect(() => {
    if (!anchorEl) return;

    const syncWidth = () => {
      const width = anchorEl.offsetWidth;
      if (width !== dropdownWidth) {
        setDropdownWidth(width);
      }
    };

    window.addEventListener("resize", syncWidth);
    return () => window.removeEventListener("resize", syncWidth);
  }, [anchorEl, dropdownWidth]);

  return {
    isOpen,
    open,
    close,
    anchorEl,
    dropdownWidth,
    setAnchorElementRef,
  };
}
