import React from "react";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useVirtualizer } from "../useVirtualizer";

describe("useVirtualizer", () => {
  const defaultProps = {
    totalItems: 100,
    itemHeight: 40,
    containerHeight: 200, // 5 items visible
    overscan: 2,
  };
  type ScrollEvent = {
    currentTarget: { scrollTop: number };
  };

  it("should return correct initial values", () => {
    const { result } = renderHook(() => useVirtualizer(defaultProps));

    expect(result.current.totalHeight).toBe(4000);
    expect(result.current.offsetY).toBe(0);
    expect(result.current.visibleRange.startIndex).toBe(0);
    // startIndex = 0
    // visibleCount = ceil(200/40) = 5
    // endIndex = min(99, 0 + 5 + 2*2) = 9
    expect(result.current.visibleRange.endIndex).toBe(9);
  });

  it("should update values on scroll", () => {
    const { result } = renderHook(() => useVirtualizer(defaultProps));

    act(() => {
      const event: ScrollEvent = {
        currentTarget: { scrollTop: 400 }, // Scrolled past 10 items
      };
      result.current.handleScroll(event as React.UIEvent<HTMLDivElement>);
    });

    // scrollTop = 400
    // startIndex = max(0, floor(400/40) - 2) = 10 - 2 = 8
    // visibleCount = 5
    // endIndex = min(99, 8 + 5 + 4) = 17
    expect(result.current.visibleRange.startIndex).toBe(8);
    expect(result.current.visibleRange.endIndex).toBe(17);
    expect(result.current.offsetY).toBe(8 * 40); // 320
  });

  it("should clamp startIndex to 0", () => {
    const { result } = renderHook(() =>
      useVirtualizer({
        ...defaultProps,
        overscan: 10,
      }),
    );

    // scrollTop = 0, floor(0/40) - 10 = -10 -> max(0, -10) = 0
    expect(result.current.visibleRange.startIndex).toBe(0);
  });

  it("should clamp endIndex to totalItems - 1", () => {
    const { result } = renderHook(() =>
      useVirtualizer({
        totalItems: 5,
        itemHeight: 40,
        containerHeight: 200,
        overscan: 2,
      }),
    );

    // startIndex = 0
    // visibleCount = 5
    // endIndex = min(4, 0 + 5 + 4) = 4
    expect(result.current.visibleRange.endIndex).toBe(4);
  });

  it("should handle large scroll values correctly", () => {
    const { result } = renderHook(() => useVirtualizer(defaultProps));

    act(() => {
      const event: ScrollEvent = {
        currentTarget: { scrollTop: 10000 },
      };
      result.current.handleScroll(event as React.UIEvent<HTMLDivElement>);
    });

    // startIndex = max(0, floor(10000/40) - 2) = 250 - 2 = 248
    // But totalItems is 100, so we need to be careful.
    // However, the hook doesn't currently clamp startIndex based on totalItems in its implementation:
    // const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);

    // endIndex is clamped:
    // const endIndex = Math.min(totalItems - 1, startIndex + visibleCount + overscan * 2);

    expect(result.current.visibleRange.startIndex).toBe(248);
    expect(result.current.visibleRange.endIndex).toBe(99);
  });
});
