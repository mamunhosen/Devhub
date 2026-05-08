import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should update value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    // Update the value
    rerender({ value: "updated", delay: 500 });

    // Should still be initial before delay
    expect(result.current).toBe("initial");

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("should debounce multiple changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    // First update
    rerender({ value: "update 1", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("initial");

    // Second update before the first one finishes
    rerender({ value: "update 2", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    // Should still be initial because the 500ms timer was reset
    expect(result.current).toBe("initial");

    // Final wait
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("update 2");
  });

  it("should use default delay of 500ms", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "updated" });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("updated");
  });

  it("should clear timer on unmount", () => {
    const spy = vi.spyOn(window, "clearTimeout");
    const { unmount } = renderHook(() => useDebounce("initial", 500));

    unmount();

    expect(spy).toHaveBeenCalled();
  });
});
