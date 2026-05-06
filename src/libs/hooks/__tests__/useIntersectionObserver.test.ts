import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useIntersectionObserver } from "../useIntersectionObserver";

describe("useIntersectionObserver", () => {
  // Mock IntersectionObserver
  const mockObserve = vi.fn();
  const mockDisconnect = vi.fn();
  const mockUnobserve = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.IntersectionObserver = vi.fn().mockImplementation(function () {
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: mockUnobserve,
      };
    }) as unknown as typeof IntersectionObserver;
  });

  it("should not observe if shouldObserve is false", () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useIntersectionObserver({ shouldObserve: false, onIntersect })
    );

    const div = document.createElement("div");
    result.current.targetRef(div);

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it("should observe if shouldObserve is true", () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useIntersectionObserver({ shouldObserve: true, onIntersect })
    );

    const div = document.createElement("div");
    result.current.targetRef(div);

    expect(mockObserve).toHaveBeenCalledWith(div);
  });

  it("should call onIntersect when element is intersecting", () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    window.IntersectionObserver = vi.fn().mockImplementation(function (callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: mockUnobserve,
      };
    }) as unknown as typeof IntersectionObserver;

    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useIntersectionObserver({ shouldObserve: true, onIntersect })
    );

    const div = document.createElement("div");
    result.current.targetRef(div);

    // Simulate intersection
    act(() => {
      if (intersectionCallback) {
        intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
      }
    });

    expect(onIntersect).toHaveBeenCalled();
  });

  it("should not call onIntersect when element is not intersecting", () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    window.IntersectionObserver = vi.fn().mockImplementation(function (callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: mockUnobserve,
      };
    }) as unknown as typeof IntersectionObserver;

    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useIntersectionObserver({ shouldObserve: true, onIntersect })
    );

    const div = document.createElement("div");
    result.current.targetRef(div);

    // Simulate non-intersection
    act(() => {
      if (intersectionCallback) {
        intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
      }
    });

    expect(onIntersect).not.toHaveBeenCalled();
  });

  it("should disconnect on unmount", () => {
    const { result, unmount } = renderHook(() =>
      useIntersectionObserver({ shouldObserve: true, onIntersect: vi.fn() })
    );

    const div = document.createElement("div");
    result.current.targetRef(div);

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should disconnect previous observer when target node changes", () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({ shouldObserve: true, onIntersect: vi.fn() })
    );

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    result.current.targetRef(div1);
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);

    result.current.targetRef(div2);
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(2);
  });
});
