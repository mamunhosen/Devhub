# Custom Select Component (Styled Components Version)

A feature-rich, highly customizable React Select component built with Material-UI, TypeScript, and styled-components. This component supports virtualization, infinite scrolling, server-side search, and multiple selection modes.

## Features

1. **Search Functionality**
   - Client-side search (default)
   - Server-side search with `searchFromServer` flag
   - Debounced search for optimal performance

2. **Loading States**
   - Linear progress bar when `loading` flag is true
   - Loading indicator for infinite scroll
   - Loading state during server searches

3. **Single / Multiple Select**
   - Single selection mode (default)
   - Multiple selection with checkboxes
   - Controlled via `multiple` prop

4. **Checkboxes for Multiple Select**
   - Automatically displays checkboxes in multiple mode
   - Visual feedback for selected items

5. **Virtualization**
   - Renders only visible items (20 by default)
   - Smooth scrolling performance
   - Configurable row height and overscan

6. **Custom Option Addition**
   - Add custom options via modal/handler
   - Reusable through `onCreateOption` callback
   - Customizable button label

7. **Pagination / Infinite Scroll**
   - Load more data as user scrolls
   - Works with server-side or client-side data
   - Configurable through `pagination` and `hasMore` flags

## Installation

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## File Structure

```
select-component-styled/
├── types.ts                       # TypeScript interfaces and types
├── hooks.ts                       # Custom React hooks
├── CustomSelect.tsx               # Main component
├── CustomSelect.styles.ts         # Styled components for CustomSelect
├── SearchInput.tsx                # Search input subcomponent
├── SearchInput.styles.ts          # Styled components for SearchInput
├── OptionItem.tsx                 # Individual option renderer
├── OptionItem.styles.ts           # Styled components for OptionItem
├── VirtualizedList.tsx            # Virtualized list with infinite scroll
├── VirtualizedList.styles.ts     # Styled components for VirtualizedList
├── CustomOptionButton.tsx         # Custom option add button
├── CustomOptionButton.styles.ts  # Styled components for CustomOptionButton
├── LoadingProgress.tsx            # Loading progress bar
├── LoadingProgress.styles.ts     # Styled components for LoadingProgress
├── SelectValueDisplay.tsx         # Selected value display
├── SelectValueDisplay.styles.ts  # Styled components for SelectValueDisplay
├── ExampleUsage.tsx               # Usage examples
└── index.ts                       # Exports
```

## Architecture

This version uses **styled-components** (MUI's `styled` API) instead of inline `sx` props for better:

### ✅ Separation of Concerns

- **Component Logic**: Business logic and behavior in `.tsx` files
- **Styling**: Visual styles in separate `.styles.ts` files
- **Type Definitions**: Interfaces in `types.ts`
- **Hooks**: Reusable logic in `hooks.ts`

### ✅ Maintainability

- Easy to locate and modify styles
- Consistent naming conventions
- Clear component structure
- Better code organization

### ✅ Reusability

- Styled components can be imported and reused
- Theme-aware styling with MUI theme access
- Type-safe props for styled components

### ✅ Performance

- Styles are compiled at build time
- No runtime style computation overhead
- Efficient component rendering

## Usage Examples

### Basic Single Select

```tsx
import { CustomSelect, SelectOption } from "./select-component-styled";

const [value, setValue] = useState<SelectOption | null>(null);
const options: SelectOption[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
];

<CustomSelect
  options={options}
  value={value}
  onChange={setValue}
  label="Select an option"
  placeholder="Choose one..."
/>;
```

### Multiple Select with Checkboxes

```tsx
const [values, setValues] = useState<SelectOption[]>([]);

<CustomSelect
  options={options}
  value={values}
  onChange={setValues}
  multiple
  label="Select multiple options"
  placeholder="Choose multiple..."
/>;
```

### Server-Side Search

```tsx
const [options, setOptions] = useState<SelectOption[]>([]);
const [loading, setLoading] = useState(false);

const handleSearch = async (searchTerm: string) => {
  setLoading(true);
  const results = await fetchFromServer(searchTerm);
  setOptions(results);
  setLoading(false);
};

<CustomSelect
  options={options}
  value={value}
  onChange={setValue}
  searchable
  searchFromServer
  onSearch={handleSearch}
  loading={loading}
/>;
```

### Infinite Scroll with Pagination

```tsx
const [options, setOptions] = useState<SelectOption[]>(initialOptions);
const [hasMore, setHasMore] = useState(true);

const handleLoadMore = async () => {
  const newOptions = await fetchMoreFromServer();
  setOptions((prev) => [...prev, ...newOptions]);
  if (newOptions.length === 0) setHasMore(false);
};

<CustomSelect
  options={options}
  value={value}
  onChange={setValue}
  pagination
  hasMore={hasMore}
  onLoadMore={handleLoadMore}
/>;
```

## Styling Customization

### Modifying Existing Styles

You can easily customize the component by editing the `.styles.ts` files:

```typescript
// CustomSelect.styles.ts
export const SelectInputBox = styled(Box)<{
  hasError?: boolean;
  isDisabled?: boolean;
  hasLabel?: boolean;
}>(({ theme, hasError, isDisabled, hasLabel }) => ({
  // Modify these values
  borderRadius: theme.shape.borderRadius, // Change border radius
  padding: theme.spacing(1.5), // Change padding
  minHeight: 56, // Change height

  // Add your custom styles
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",

  "&:hover": {
    // Custom hover effect
    transform: "translateY(-1px)",
  },
}));
```

### Creating Theme Variants

```typescript
// Create a custom theme variant
const customTheme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
        },
      },
    },
  },
});

<ThemeProvider theme={customTheme}>
  <CustomSelect {...props} />
</ThemeProvider>
```

### Extending Styled Components

```typescript
// Create your own variant
import { StyledListItemButton } from "./OptionItem.styles";

const MyCustomListItem = styled(StyledListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));
```

## Props

| Prop                   | Type                                     | Default      | Description                    |
| ---------------------- | ---------------------------------------- | ------------ | ------------------------------ |
| `options`              | `SelectOption[]`                         | **Required** | Array of options to display    |
| `value`                | `SelectOption \| SelectOption[] \| null` | **Required** | Currently selected value(s)    |
| `onChange`             | `(value) => void`                        | **Required** | Called when selection changes  |
| `multiple`             | `boolean`                                | `false`      | Enable multiple selection      |
| `searchable`           | `boolean`                                | `true`       | Enable search functionality    |
| `pagination`           | `boolean`                                | `false`      | Enable infinite scroll         |
| `allowCreateOption`    | `boolean`                                | `false`      | Show "Add Custom" button       |
| `loading`              | `boolean`                                | `false`      | Show loading progress bar      |
| `searchFromServer`     | `boolean`                                | `false`      | Search from server vs client   |
| `onSearch`             | `(term: string) => Promise<void>`        | -            | Server search handler          |
| `onLoadMore`           | `() => Promise<void>`                    | -            | Load more data handler         |
| `hasMore`              | `boolean`                                | `false`      | More data available flag       |
| `onCreateOption`       | `() => void`                             | -            | Custom option click handler    |
| `createOptionLabel`    | `string`                                 | -            | Label for custom option button |
| `virtualizedRowHeight` | `number`                                 | `48`         | Height of each option row      |
| `virtualizedOverscan`  | `number`                                 | `5`          | Number of extra rows to render |
| `label`                | `string`                                 | -            | Input label                    |
| `placeholder`          | `string`                                 | -            | Placeholder text               |
| `error`                | `boolean`                                | `false`      | Show error state               |
| `helperText`           | `string`                                 | -            | Helper text below input        |
| `disabled`             | `boolean`                                | `false`      | Disable the component          |
| `fullWidth`            | `boolean`                                | `true`       | Take full width                |
| `required`             | `boolean`                                | `false`      | Mark as required               |

## Comparison: Styled Components vs SX Props

### Styled Components Approach (This Version)

**Pros:**

- ✅ Better separation of concerns
- ✅ Easier to maintain and modify
- ✅ Reusable styled components
- ✅ Better performance (compiled at build time)
- ✅ Clear file structure
- ✅ Type-safe prop forwarding

**Cons:**

- ❌ More files to manage
- ❌ Slightly more verbose

### SX Props Approach

**Pros:**

- ✅ Less boilerplate
- ✅ Styles co-located with components
- ✅ Quick prototyping

**Cons:**

- ❌ Harder to maintain at scale
- ❌ Styles mixed with logic
- ❌ Runtime style computation
- ❌ Less reusable

## Performance Optimization

1. **Virtualization**: Only renders visible items (20 items by default)
2. **Memoization**: Uses useMemo and useCallback to prevent unnecessary re-renders
3. **Debounced Search**: Reduces API calls during typing
4. **Lazy Loading**: Loads data on-demand with pagination
5. **Compiled Styles**: Styled components are compiled at build time

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
