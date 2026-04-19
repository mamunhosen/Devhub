import { useState, useCallback, useMemo } from "react";

import type { SelectOption } from "../SelectRoot.types";

export const useSelectSearch = (
  options: SelectOption[],
  searchFromServer: boolean,
  onSearch?: (searchTerm: string) => void,
) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);

      if (searchFromServer && onSearch) {
        onSearch(value);
      }
    },
    [searchFromServer, onSearch],
  );

  const filteredOptions = useMemo(() => {
    if (searchFromServer || !searchTerm) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm, searchFromServer]);

  return {
    searchTerm,
    handleSearchChange,
    filteredOptions,
  };
};
