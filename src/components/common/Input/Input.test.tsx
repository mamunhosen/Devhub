import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AppInput from "./Input";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

describe("AppInput Component", () => {
  const defaultProps = {
    name: "test-input",
    label: "Test Label",
    placeholder: "Enter text",
  };

  describe("Rendering", () => {
    it("should render the input with a label", () => {
      render(<AppInput {...defaultProps} />);
      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("should display helper text when provided", () => {
      render(<AppInput {...defaultProps} helperText="Helpful hint" />);
      expect(screen.getByText("Helpful hint")).toBeInTheDocument();
    });

    it("should show error state when error prop is true", () => {
      render(<AppInput {...defaultProps} error helperText="Error message" />);
      const helperText = screen.getByText("Error message");
      expect(helperText).toHaveClass("Mui-error");
    });

    it("should render start and end adornments within the input area", () => {
      render(
        <AppInput
          {...defaultProps}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon data-testid="search-icon" />
            </InputAdornment>
          }
          endAdornment={<span data-testid="end-text">Units</span>}
        />,
      );

      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
      expect(screen.getByTestId("end-text")).toBeInTheDocument();
    });

    it("should show LockIcon when disabled or loading", () => {
      const { rerender } = render(<AppInput {...defaultProps} disabled />);
      expect(screen.getByTestId("LockIcon")).toBeInTheDocument();

      rerender(<AppInput {...defaultProps} loading />);
      expect(screen.getByTestId("LockIcon")).toBeInTheDocument();
    });

    it("should show ProgressBar when loading", () => {
      render(<AppInput {...defaultProps} loading />);
      // LinearProgress has role="progressbar"
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should handle text changes", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<AppInput {...defaultProps} onChange={onChange} />);
      const input = screen.getByPlaceholderText("Enter text");

      await user.type(input, "Hello World");

      expect(onChange).toHaveBeenCalled();
      expect(input).toHaveValue("Hello World");
    });

    it("should not allow interaction when disabled", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<AppInput {...defaultProps} disabled onChange={onChange} />);
      const input = screen.getByPlaceholderText("Enter text");

      await user.type(input, "Hello");

      expect(input).toBeDisabled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should not allow interaction when loading", async () => {
      const onChange = vi.fn();
      userEvent.setup();

      render(<AppInput {...defaultProps} loading onChange={onChange} />);
      const input = screen.getByPlaceholderText("Enter text");

      expect(input).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("should associate label with input using id", () => {
      render(<AppInput {...defaultProps} />);
      const input = screen.getByLabelText("Test Label");
      expect(input).toHaveAttribute("id", "test-input-input");
    });

    it("should have required attribute when passed", () => {
      render(<AppInput {...defaultProps} required />);
      expect(screen.getByLabelText(/Test Label/)).toBeRequired();
    });
  });
});
