export interface SearchFieldProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
