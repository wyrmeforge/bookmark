import { InputProps } from '@/shared/ui/input';
import { Control, FieldError, FieldPath, FieldValues } from 'react-hook-form';

export interface IFormInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  error?: FieldError;
  required?: boolean;
}
