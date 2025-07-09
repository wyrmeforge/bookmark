export interface SearchInputUIProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  isSearchVisible: boolean;
  toggleSearchVisibility: () => void;
}
