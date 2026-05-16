/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useInfiniteDataset } from "../useInfiniteDataset";
import { apiClient } from "@/libs/apiClient";
import * as registry from "../../registry";

// test key
const TEST_DATASET_KEY = "test" as any;

// Mock apiClient
vi.mock("@/libs/apiClient", () => ({
  apiClient: vi.fn(),
}));

// Mock registry
vi.mock("../../registry", () => ({
  getDatasetConfig: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useInfiniteDataset Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCursorConfig = {
    url: "/test-cursor",
    getQueryKey: ["test-cursor"],
    paginationType: "cursor",
    params: { limit: 10 },
    retry: false,
  };

  const mockOffsetConfig = {
    url: "/test-offset",
    getQueryKey: ["test-offset"],
    paginationType: "offset",
    params: { limit: 5 },
    retry: false,
  };

  describe("Cursor-based Pagination", () => {
    it("should fetch initial page successfully", async () => {
      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        mockCursorConfig as any,
      );
      vi.mocked(apiClient).mockResolvedValue({
        data: { data: [{ id: 1, name: "Item 1" }], nextToken: "page-2" },
      } as any);

      const { result } = renderHook(
        () => useInfiniteDataset(TEST_DATASET_KEY),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(apiClient).toHaveBeenCalledWith({
        url: "/test-cursor",
        method: "GET",
        params: { limit: 10 },
        pathParams: {},
      });

      // Default select for cursor transforms pages to flat list
      expect(result.current.data).toEqual([{ label: "Item 1", value: 1 }]);
    });

    it("should fetch next page using nextToken", async () => {
      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        mockCursorConfig as any,
      );

      // First call
      vi.mocked(apiClient).mockResolvedValueOnce({
        data: { data: [{ id: 1, name: "Item 1" }], nextToken: "page-2" },
      } as any);

      // Second call
      vi.mocked(apiClient).mockResolvedValueOnce({
        data: { data: [{ id: 2, name: "Item 2" }], nextToken: null },
      } as any);

      const { result } = renderHook(
        () => useInfiniteDataset(TEST_DATASET_KEY),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.hasNextPage).toBe(true);

      // Fetch next page
      act(() => {
        result.current.fetchNextPage();
      });

      // Wait for the next page fetch to complete and data to update
      await waitFor(
        () => expect(result.current.isFetchingNextPage).toBe(false),
        { timeout: 2000 },
      );
      await waitFor(() => expect(result.current.data).toHaveLength(2));

      // Combined data
      expect(result.current.data).toEqual([
        { value: 1, label: "Item 1" },
        { value: 2, label: "Item 2" },
      ]);

      expect(apiClient).toHaveBeenCalledTimes(2);
    });
  });

  describe("Offset-based Pagination", () => {
    it("should fetch initial page with skip 0", async () => {
      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        mockOffsetConfig as any,
      );
      vi.mocked(apiClient).mockResolvedValue({
        data: { data: [{ id: 1, name: "Item 1" }], total: 10 },
      } as any);

      const { result } = renderHook(
        () => useInfiniteDataset(TEST_DATASET_KEY),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(apiClient).toHaveBeenCalledWith({
        url: "/test-offset",
        method: "GET",
        params: { limit: 5, skip: 0 },
        pathParams: {},
      });
    });

    it("should fetch next page incrementing skip", async () => {
      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        mockOffsetConfig as any,
      );

      vi.mocked(apiClient).mockResolvedValueOnce({
        data: {
          data: [
            { id: 1, name: "1" },
            { id: 2, name: "2" },
          ],
          total: 4,
        },
      } as any);

      vi.mocked(apiClient).mockResolvedValueOnce({
        data: {
          data: [
            { id: 3, name: "3" },
            { id: 4, name: "4" },
          ],
          total: 4,
        },
      } as any);

      const { result } = renderHook(
        () => useInfiniteDataset(TEST_DATASET_KEY),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() =>
        expect(result.current.isFetchingNextPage).toBe(false),
      );

      // Check second call used skip=2
      expect(apiClient).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({ skip: 2 }),
        }),
      );
    });
  });

  describe("Shared Logic", () => {
    it("should merge pathParams and params", async () => {
      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        mockCursorConfig as any,
      );
      vi.mocked(apiClient).mockResolvedValue({ data: { data: [] } } as any);

      renderHook(
        () =>
          useInfiniteDataset(TEST_DATASET_KEY, {
            params: { custom: "p" },
            pathParams: { id: "1" },
          }),
        { wrapper: createWrapper() },
      );

      await waitFor(() => expect(apiClient).toHaveBeenCalled());

      expect(apiClient).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({ custom: "p" }),
          pathParams: { id: "1" },
        }),
      );
    });

    it("should use custom select if provided", async () => {
      const customSelect = vi.fn().mockReturnValue(["custom"]);
      const configWithSelect = { ...mockCursorConfig, select: customSelect };

      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        configWithSelect as any,
      );
      vi.mocked(apiClient).mockResolvedValue({ data: { data: [] } } as any);

      const { result } = renderHook(
        () => useInfiniteDataset(TEST_DATASET_KEY),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(["custom"]);
    });

    it("should handle error states", async () => {
      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        mockCursorConfig as any,
      );
      vi.mocked(apiClient).mockRejectedValue(new Error("Infinite Error"));

      const { result } = renderHook(
        () => useInfiniteDataset(TEST_DATASET_KEY),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error?.message).toBe("Infinite Error");
    });

    it("should handle enabled state", () => {
      const configWithEnabled = {
        ...mockCursorConfig,
        enabled: (pathParams: any) => !!pathParams.id,
      };
      vi.mocked(registry.getDatasetConfig).mockReturnValue(
        configWithEnabled as any,
      );

      const { result } = renderHook(
        () => useInfiniteDataset(TEST_DATASET_KEY, { pathParams: {} }),
        { wrapper: createWrapper() },
      );

      expect(result.current.isPending).toBe(true);
      expect(apiClient).not.toHaveBeenCalled();
    });
  });
});
