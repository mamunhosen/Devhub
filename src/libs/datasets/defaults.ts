// lib/datasets/defaults.ts
import { type SelectOption } from "@/components/common";

import type {
  DefaultSelectResponse,
  OptionItem,
  CursorPaginatedDatasetResponse,
  CursorPaginatedDatasetPagesResponse,
  OffsetPaginatedDatasetResponse,
  OffsetPaginatedDatasetPagesResponse,
} from "./types";

export const DEFAULT_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
  retry: 3,

  /**
   * Default select for regular queries
   */
  select: <T extends { id: string | number; name: string }>(
    response: DefaultSelectResponse<T>,
  ): SelectOption[] => {
    return response.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  },

  /**
   * Infinite query defaults
   */
  infiniteQuery: {
    paginationType: "cursor",
    /**
     * Initial page param - null for first request (no cursor)
     */
    initialPageParam: null as string | null,

    /**
     * Cursor pagination config
     */
    cursor: {
      initialPageParam: null as string | null,
      getNextPageParam: <T = OptionItem>(
        lastPage: CursorPaginatedDatasetResponse<T>,
      ): string | null | undefined => lastPage.nextToken ?? undefined,
      select: <T extends OptionItem>(
        data: CursorPaginatedDatasetPagesResponse<T>,
      ): SelectOption[] => {
        return (
          data?.pages
            .flatMap((page) => page.data)
            .map(({ id, name }) => ({
              value: id,
              label: name,
            })) ?? []
        );
      },
    },

    /**
     * Offset pagination config
     */

    offset: {
      initialPageParam: 0,
      getNextPageParam: <T = OptionItem>(
        lastPage: OffsetPaginatedDatasetResponse<T>,
        allPages: OffsetPaginatedDatasetResponse<T>[],
      ): number | undefined => {
        const totalFetched = allPages.reduce(
          (sum, page) => sum + page.data.length,
          0,
        );
        return totalFetched < lastPage.total ? totalFetched : undefined;
      },
      select: <T extends OptionItem>(
        data: OffsetPaginatedDatasetPagesResponse<T>,
      ): SelectOption[] => {
        return (
          data?.pages
            .flatMap((page) => page.data)
            .map(({ id, name }) => ({
              value: id,
              label: name,
            })) ?? []
        );
      },
    },
  },
} as const;
