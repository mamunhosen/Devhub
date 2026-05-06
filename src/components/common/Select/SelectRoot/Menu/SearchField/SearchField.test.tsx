import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { SearchField } from "./SearchField";

describe("SearchField Component", () => {
  const defaultProps = {
    searchTerm: "",
    onSearchChange: vi.fn(),
  };

  describe("Rendering", () => {
    it("should render with default placeholder", () => {
      render(<SearchField {...defaultProps} />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("should render with custom placeholder", () => {
      render(<SearchField {...defaultProps} placeholder="Custom search..." />);
      expect(
        screen.getByPlaceholderText("Custom search..."),
      ).toBeInTheDocument();
    });

    it("should display the provided searchTerm", () => {
      render(<SearchField {...defaultProps} searchTerm="initial value" />);
      const input = screen.getByPlaceholderText("Search...");
      expect(input).toHaveValue("initial value");
    });

    it("should be disabled when disabled prop is true", () => {
      render(<SearchField {...defaultProps} disabled />);
      const input = screen.getByPlaceholderText("Search...");
      expect(input).toBeDisabled();
    });

    it("should have autoFocus attribute", () => {
      render(<SearchField {...defaultProps} />);
      const input = screen.getByPlaceholderText("Search...");
      expect(input).toHaveFocus();
    });

    it("should render search icon", () => {
      render(<SearchField {...defaultProps} />);
      // Search icon is from @mui/icons-material/Search which renders as an svg
      expect(
        document.querySelector("svg[data-testid='SearchIcon']"),
      ).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should call onSearchChange when typing", async () => {
      const onSearchChange = vi.fn();
      const user = userEvent.setup();
      render(<SearchField {...defaultProps} onSearchChange={onSearchChange} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "a");

      expect(onSearchChange).toHaveBeenCalledWith("a");
    });

    it("should call onSearchChange multiple times for each keystroke and update value when searchTerm prop changes", async () => {
      const onSearchChange = vi.fn();

      const Wrapper = () => {
        const [searchTerm, setSearchTerm] = React.useState("");
        const handleChange = (value: string) => {
          setSearchTerm(value);
          onSearchChange(value); // spy onSearchChange
        };
        return (
          <SearchField searchTerm={searchTerm} onSearchChange={handleChange} />
        );
      };

      const user = userEvent.setup();
      render(<Wrapper />);

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "abc");

      // 1. called per keystroke
      expect(onSearchChange).toHaveBeenCalledTimes(3);

      // 2. called with incremental values
      expect(onSearchChange).toHaveBeenNthCalledWith(1, "a");
      expect(onSearchChange).toHaveBeenNthCalledWith(2, "ab");
      expect(onSearchChange).toHaveBeenNthCalledWith(3, "abc");

      // 3. final UI state
      expect(input).toHaveValue("abc");
    });
  });
});
