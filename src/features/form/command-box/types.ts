import { Control, FieldPath, FieldValues } from 'react-hook-form';

type ListItem = {
  id: string;
  name: string;
  image: string;
};

export interface ICommandBoxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  error?: string;
  placeholder: string;
  items: ListItem[];
  handleSearch: (searchValue: string) => void;
}
