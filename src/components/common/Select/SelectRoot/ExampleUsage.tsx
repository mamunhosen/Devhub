import React, { useState, useCallback } from "react";
import {
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/material";

import type { SelectOption, SelectValue } from "./SelectRoot.types";
import { SelectRoot } from "./SelectRoot";

// Mock data generator
const generateOptions = (start: number, count: number): SelectOption[] => {
  return Array.from({ length: count }, (_, i) => ({
    value: start + i,
    label: `Option ${start + i}`,
  }));
};

const ExampleUsage: React.FC = () => {
  // Example 1: Simple single select with local search
  const [singleValue, setSingleValue] = useState<SelectValue | null>(null);
  const simpleOptions = generateOptions(1, 50);

  // Example 2: Multiple select with checkboxes
  const [multipleValue, setMultipleValue] = useState<SelectValue[]>([]);
  const multipleOptions = generateOptions(1, 100);

  // Example 3: Pagination with infinite scroll
  const [paginatedOptions, setPaginatedOptions] = useState<SelectOption[]>(
    generateOptions(1, 20),
  );
  const [paginatedValue, setPaginatedValue] = useState<SelectValue | null>(
    null,
  );
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    setLoadingMore(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentLength = paginatedOptions.length;
    const newOptions = generateOptions(currentLength + 1, 20);

    setPaginatedOptions((prev) => [...prev, ...newOptions]);

    // Stop pagination after 100 items
    if (currentLength + 20 >= 100) {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [paginatedOptions.length]);

  // Example 4: Server-side search
  const [serverSearchOptions, setServerSearchOptions] = useState<
    SelectOption[]
  >(generateOptions(1, 20));
  const [serverSearchValue, setServerSearchValue] =
    useState<SelectValue | null>(null);
  const [searching, setSearching] = useState(false);

  const handleServerSearch = useCallback(async (searchTerm: string) => {
    setSearching(true);
    // Simulate API search
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (searchTerm) {
      const filtered = generateOptions(1, 100).filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setServerSearchOptions(filtered);
    } else {
      setServerSearchOptions(generateOptions(1, 20));
    }

    setSearching(false);
  }, []);

  // Example 5: Custom option modal
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customValue, setCustomValue] = useState<SelectValue | null>(null);
  const [customOptions, setCustomOptions] = useState<SelectOption[]>(
    generateOptions(1, 30),
  );
  const [newOptionLabel, setNewOptionLabel] = useState("");

  const handleCustomOptionClick = useCallback(() => {
    setCustomModalOpen(true);
  }, []);

  const handleAddCustomOption = useCallback(() => {
    if (newOptionLabel.trim()) {
      const newOption: SelectOption = {
        value: Date.now(),
        label: newOptionLabel,
      };
      setCustomOptions((prev) => [...prev, newOption]);
      setCustomValue(newOption.value);
      setNewOptionLabel("");
      setCustomModalOpen(false);
    }
  }, [newOptionLabel]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
        Custom Select Component Examples
      </Typography>

      <Grid container spacing={3}>
        {/* Example 1 */}
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              1. Single Select (Local Search)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Basic single selection with client-side search
            </Typography>
            <SelectRoot
              options={simpleOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as SelectValue)}
              label="Select an option"
              placeholder="Choose one..."
              searchable
              helperText="50 options with local search"
            />
            {singleValue && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Selected:{" "}
                {
                  simpleOptions.find(
                    (opt: SelectOption) => opt.value === singleValue,
                  )?.label
                }
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Example 2 */}
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              2. Multiple Select with Checkboxes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Multiple selection with checkbox indicators
            </Typography>
            <SelectRoot
              options={multipleOptions}
              value={multipleValue}
              onChange={(val) => setMultipleValue(val as SelectValue[])}
              multiple
              label="Select multiple options"
              placeholder="Choose multiple..."
              searchable
              helperText="100 options available"
            />
            {multipleValue.length > 0 && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Selected: {multipleValue.length} items
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Example 3 */}
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              3. Infinite Scroll with Pagination
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Loads more options as you scroll
            </Typography>
            <SelectRoot
              options={paginatedOptions}
              value={paginatedValue}
              onChange={(val) => setPaginatedValue(val as SelectValue | null)}
              pagination
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              loading={loadingMore}
              label="Select with pagination"
              placeholder="Scroll to load more..."
              helperText={`Loaded: ${paginatedOptions.length} options`}
            />
          </Paper>
        </Grid>

        {/* Example 4 */}
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              4. Server-Side Search
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Search queries are sent to server
            </Typography>
            <SelectRoot
              options={serverSearchOptions}
              value={serverSearchValue}
              onChange={(val) =>
                setServerSearchValue(val as SelectValue | null)
              }
              searchable
              searchFromServer
              onSearch={handleServerSearch}
              loading={searching}
              label="Search from server"
              placeholder="Type to search..."
              helperText="Try searching for 'Option 50'"
            />
          </Paper>
        </Grid>

        {/* Example 5 */}
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              5. Custom Option with Modal
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add custom options via modal dialog
            </Typography>
            <SelectRoot
              options={customOptions}
              value={customValue}
              onChange={(val) => setCustomValue(val as SelectValue | null)}
              allowCreateOption
              onCreateOption={handleCustomOptionClick}
              createOptionLabel="Add New Option"
              label="Select or add option"
              placeholder="Select or create..."
              searchable
              helperText={`${customOptions.length} options (you can add more)`}
            />
          </Paper>
        </Grid>

        {/* Example 6 */}
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              6. All Features Combined
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Multiple select + search + pagination + custom option
            </Typography>
            <SelectRoot
              options={paginatedOptions}
              value={multipleValue}
              onChange={(val) => setMultipleValue(val as SelectValue[])}
              multiple
              searchable
              pagination
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              allowCreateOption
              onCreateOption={handleCustomOptionClick}
              label="Full-featured select"
              placeholder="All features enabled..."
              helperText="Complete example with all features"
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Custom Option Modal */}
      <Dialog
        open={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Custom Option</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Option Label"
            type="text"
            fullWidth
            variant="outlined"
            value={newOptionLabel}
            onChange={(e) => setNewOptionLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCustomOption();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddCustomOption}
            variant="contained"
            disabled={!newOptionLabel.trim()}
          >
            Add Option
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExampleUsage;
