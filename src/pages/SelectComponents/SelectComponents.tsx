import React from "react";

import { Grid } from "@mui/material";

import { PaginatedSelect, SelectDataSource } from "@/components/common";
import type { SelectValue } from "@/components/common";

import {
  ORGANIZATIONS_CURSOR,
  ORGANIZATIONS_OFFSET,
  BRANCES,
} from "./query.datasets";

const SelectComponents: React.FC = () => {
  const [selectedOrganization, setSelectedOrganization] =
    React.useState<SelectValue | null>(null);
  const [selectedBranch, setSelectedBranch] = React.useState<SelectValue[]>([]);

  const handleOrganizationChange = (value: SelectValue | null) => {
    setSelectedOrganization(value);
    setSelectedBranch([]);
  };

  const branchQueryOptions = {
    pathParams: {
      organizationId: selectedOrganization?.toString() ?? "",
    },
  };

  return (
    <Grid container sx={{ width: "100%" }} spacing={2}>
      <Grid size={{ xs: 12, md: 3 }} component="div">
        <PaginatedSelect
          datasetKey={ORGANIZATIONS_CURSOR}
          label="Paginate organizations(cursor)"
          value={selectedOrganization}
          onChange={handleOrganizationChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }} component="div">
        <PaginatedSelect
          datasetKey={ORGANIZATIONS_OFFSET}
          label="Paginate organizations(offset)"
          value={selectedOrganization}
          onChange={handleOrganizationChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }} component="div">
        <SelectDataSource
          datasetKey={BRANCES}
          label="Select branch"
          onChange={setSelectedBranch}
          value={selectedBranch}
          queryOptions={branchQueryOptions}
          multiple
        />
      </Grid>
    </Grid>
  );
};

export default SelectComponents;
