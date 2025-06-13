import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface FormCheckboxProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
}
