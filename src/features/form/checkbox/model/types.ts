import { FieldPath, FieldValues } from 'react-hook-form';

export interface FormCheckboxProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
  className?: string;
}
