// lib/react-query/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
      retry: 3,
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnReconnect: true, // Refetch on reconnect
    },
    mutations: {
      retry: 1,
    },
  },
});
