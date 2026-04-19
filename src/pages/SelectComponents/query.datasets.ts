// pages/Dashboard/dashboard.datasets.ts
import type {
  DatasetRegistry,
  CursorPaginatedDatasetResponse,
  DefaultSelectResponse,
} from "@/libs/datasets";

import type { Organization, Branch } from "./dataset.types";

export const ORGANIZATIONS_CURSOR = "@organizations";
export const ORGANIZATIONS_OFFSET = "@organizationsOffset";
export const BRANCES = "@branches";

const dashboardDatasets = {
  [ORGANIZATIONS_CURSOR]: {
    url: "organizations",
    getQueryKey: (params) => ["organizations", "infinite-cursor", params],
    params: {
      limit: 10,
    },
    getNextPageParam: (lastPage, allPages) => {
      const typedLastPage =
        lastPage as CursorPaginatedDatasetResponse<Organization>;

      // Custom logic: stop after 5 pages even if there's more data
      if (allPages.length >= 10) return undefined;
      return typedLastPage.nextToken ?? undefined;
    },
  },

  [ORGANIZATIONS_OFFSET]: {
    url: "organizations",
    getQueryKey: (params) => ["organizations", "infinite-offset", params],
    params: {
      limit: 10,
      skip: 0,
    },
    paginationType: "offset",
  },

  [BRANCES]: {
    url: "branches/:organizationId",
    getQueryKey: (params) => ["branches", params],
    enabled: (pathParams) => !!pathParams?.organizationId,
    select: (data) => {
      const typedData = data as DefaultSelectResponse<Branch>;
      return (
        typedData.data.map(({ id, name, location }) => ({
          value: id,
          label: name + " - " + location,
        })) ?? []
      );
    },
  },
} satisfies DatasetRegistry;

export default dashboardDatasets;
