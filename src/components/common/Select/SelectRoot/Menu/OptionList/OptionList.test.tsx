import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { OptionList } from "./OptionList";
import { DEFAULT_ROW_HEIGHT } from "./constants";

describe("OptionList Component", () => {
  const options = Array.from({ length: 20 }, (_, i) => ({
    value: i,
    label: `Option ${i}`,
  }));

  const defaultProps = {
    options,
    selectedValues: [],
    multiple: false,
    onOptionClick: vi.fn(),
    shouldObserve: false,
    listMaxNoOfItems: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock IntersectionObserver
    window.IntersectionObserver = vi.fn().mockImplementation(function () {
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      };
    }) as unknown as typeof IntersectionObserver;
  });

  it("should render a subset of options due to virtualization", () => {
    render(<OptionList {...defaultProps} />);

    // listMaxNoOfItems is 5, overscan is 5
    // startIndex = 0
    // visibleCount = 5
    // endIndex = 0 + 5 + 10 = 15
    // Rendered items: 0 to 15 (16 items)

    const renderedOptions = screen.getAllByRole("button");
    expect(renderedOptions.length).toBe(16);
    expect(screen.getByText("Option 0")).toBeInTheDocument();
    expect(screen.getByText("Option 15")).toBeInTheDocument();
    expect(screen.queryByText("Option 16")).not.toBeInTheDocument();
  });

  it("should render empty state when no options are provided", () => {
    render(<OptionList {...defaultProps} options={[]} />);
    expect(screen.getByText("No options available")).toBeInTheDocument();
  });

  it("should call onOptionClick when an option is clicked", () => {
    render(<OptionList {...defaultProps} />);
    const option = screen.getByText("Option 0");
    fireEvent.click(option);
    expect(defaultProps.onOptionClick).toHaveBeenCalledWith(options[0]);
  });

  it("should show checkboxes when multiple is true", () => {
    render(<OptionList {...defaultProps} multiple={true} />);
    // Checkboxes in MUI use input[type="checkbox"]
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it("should highlight selected options", () => {
    render(<OptionList {...defaultProps} selectedValues={[0]} />);
    // ListItemButton adds Mui-selected class
    const option = screen.getByText("Option 0");
    const button = option.closest(".Mui-selected");
    expect(button).toBeInTheDocument();
  });

  it("should handle scrolling and update visible items", () => {
    const { container } = render(<OptionList {...defaultProps} />);
    // The scrollable container is the first child of OptionListContainer (which is a div)
    // Actually OptionListContainer is a div itself.
    const scrollContainer = container.firstChild as HTMLElement;

    // Mock scrollTop
    Object.defineProperty(scrollContainer, "scrollTop", {
      value: 10 * DEFAULT_ROW_HEIGHT,
      writable: true,
    });

    // Trigger scroll event
    fireEvent.scroll(scrollContainer);

    // After scrolling 10 items:
    // startIndex = max(0, 10 - 5) = 5
    // endIndex = min(19, 5 + 5 + 10) = 19
    // Rendered items: 5 to 19 (15 items)

    expect(screen.getByText("Option 5")).toBeInTheDocument();
    expect(screen.getByText("Option 19")).toBeInTheDocument();
    expect(screen.queryByText("Option 4")).not.toBeInTheDocument();
  });

  it("should setup intersection observer if shouldObserve is true and last item is rendered", () => {
    const onLoadMore = vi.fn();
    // Reduce options so the last one is visible (index 4)
    render(
      <OptionList
        {...defaultProps}
        options={options.slice(0, 5)}
        shouldObserve={true}
        onLoadMore={onLoadMore}
      />,
    );

    expect(window.IntersectionObserver).toHaveBeenCalled();
  });
});
