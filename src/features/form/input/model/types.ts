import { InputProps } from '@/shared/ui/input';
import { FieldPath, FieldValues } from 'react-hook-form';

export interface IFormInputProps<T extends FieldValues> extends InputProps {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
}
