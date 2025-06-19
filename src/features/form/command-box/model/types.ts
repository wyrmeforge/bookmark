import { FieldPath, FieldValues } from 'react-hook-form';

type ListItem = {
  id: string;
  name: string;
  image: string;
};

export interface IFormCommandBoxProps<T extends FieldValues> {
  name: FieldPath<T>;
  items: ListItem[];
  onSearchChange?: (val: string) => void;
  placeholder: string;
  isLoading: boolean;
}
