import { useState, useCallback, useMemo, useEffect } from "react";

import { useDebounce } from "@/libs/hooks";

import type { SelectOption } from "../SelectRoot.types";

export const useSelectSearch = (
  options: SelectOption[],
  searchFromServer: boolean = false,
  onSearch?: (searchTerm: string) => void,
  debounceMs: number = 300,
) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredOptions = useMemo(() => {
    if (searchFromServer || !debouncedSearchTerm) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [options, debouncedSearchTerm, searchFromServer]);

  useEffect(() => {
    if (searchFromServer && onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchFromServer, onSearch]);

  return {
    searchTerm,
    handleSearchChange,
    filteredOptions,
  };
};
