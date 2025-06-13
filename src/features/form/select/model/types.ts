import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface ISelectItem {
  value: string;
  label: string;
}

export interface IFormSelectProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  items: ISelectItem[];
  disabled?: boolean;
  className?: string;
}
