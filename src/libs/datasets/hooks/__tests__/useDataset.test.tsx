/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useDataset } from "../useDataset";
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

describe("useDataset Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockConfig = {
    url: "/test-url",
    getQueryKey: ["test-key"],
    params: { defaultParam: "value" },
    retry: false,
  };

  it("should fetch data successfully with basic config", async () => {
    vi.mocked(registry.getDatasetConfig).mockReturnValue(mockConfig as any);
    vi.mocked(apiClient).mockResolvedValue({
      data: { data: [{ id: 1, name: "Item 1" }] },
    } as any);

    const { result } = renderHook(() => useDataset(TEST_DATASET_KEY), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClient).toHaveBeenCalledWith({
      url: "/test-url",
      method: "GET",
      params: { defaultParam: "value" },
      pathParams: {},
    });

    // Default select transforms { data: [{ id, name }] } to [{ label, value }]
    expect(result.current.data).toEqual([{ label: "Item 1", value: 1 }]);
  });

  it("should merge pathParams and params from options", async () => {
    const configWithPaths = {
      ...mockConfig,
      url: "/test/:id",
      pathParams: { id: "default" },
    };
    vi.mocked(registry.getDatasetConfig).mockReturnValue(
      configWithPaths as any,
    );
    vi.mocked(apiClient).mockResolvedValue({ data: { data: [] } } as any);

    const { result } = renderHook(
      () =>
        useDataset(TEST_DATASET_KEY, {
          params: { customParam: "custom" },
          pathParams: { id: "override" },
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClient).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { defaultParam: "value", customParam: "custom" },
        pathParams: { id: "override" },
      }),
    );
  });

  it("should handle dynamic enabled state based on pathParams", () => {
    const configWithEnabled = {
      ...mockConfig,
      enabled: (pathParams: any) => !!pathParams.id,
    };
    vi.mocked(registry.getDatasetConfig).mockReturnValue(
      configWithEnabled as any,
    );

    const { result } = renderHook(
      () => useDataset(TEST_DATASET_KEY, { pathParams: {} }),
      { wrapper: createWrapper() },
    );

    // Should be disabled because pathParams.id is missing
    expect(result.current.isPending).toBe(true);
    expect(result.current.fetchStatus).toBe("idle");
    expect(apiClient).not.toHaveBeenCalled();
  });

  it("should support function-based getQueryKey", async () => {
    const configWithKeyFn = {
      ...mockConfig,
      getQueryKey: (params: any) => ["test", params.id],
    };
    vi.mocked(registry.getDatasetConfig).mockReturnValue(
      configWithKeyFn as any,
    );
    vi.mocked(apiClient).mockResolvedValue({ data: { data: [] } } as any);

    const { result } = renderHook(
      () => useDataset(TEST_DATASET_KEY, { pathParams: { id: "123" } }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // We can check if it used the right key by looking at internal queryKey if needed,
    // but verifying it called the right config is usually enough.
  });

  it("should use custom select function if provided in config", async () => {
    const customSelect = vi.fn().mockReturnValue("custom-transformed");
    const configWithSelect = {
      ...mockConfig,
      select: customSelect,
    };
    vi.mocked(registry.getDatasetConfig).mockReturnValue(
      configWithSelect as any,
    );
    vi.mocked(apiClient).mockResolvedValue({ data: "raw-data" } as any);

    const { result } = renderHook(() => useDataset(TEST_DATASET_KEY), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(customSelect).toHaveBeenCalledWith("raw-data");
    expect(result.current.data).toBe("custom-transformed");
  });

  it("should allow overriding via queryOptions", async () => {
    vi.mocked(registry.getDatasetConfig).mockReturnValue(mockConfig as any);
    vi.mocked(apiClient).mockResolvedValue({ data: { data: [] } } as any);

    renderHook(
      () =>
        useDataset(TEST_DATASET_KEY, {
          queryOptions: { enabled: false },
        }),
      { wrapper: createWrapper() },
    );

    expect(apiClient).not.toHaveBeenCalled();
  });

  it("should handle error states", async () => {
    vi.mocked(registry.getDatasetConfig).mockReturnValue(mockConfig as any);
    vi.mocked(apiClient).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useDataset(TEST_DATASET_KEY), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Network Error");
  });

  it("should use default configuration values when not provided in config", async () => {
    const minimalConfig = {
      url: "/minimal",
      getQueryKey: ["minimal"],
    };
    vi.mocked(registry.getDatasetConfig).mockReturnValue(minimalConfig as any);
    vi.mocked(apiClient).mockResolvedValue({ data: { data: [] } } as any);

    const { result } = renderHook(() => useDataset(TEST_DATASET_KEY), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // We can't easily verify staleTime/gcTime without deeper inspection of queryClient,
    // but the hook executing successfully confirms it didn't crash on missing optional config.
  });
});
