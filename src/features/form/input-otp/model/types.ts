import { InputProps } from '@/shared/ui/input';
import { FieldPath, FieldValues } from 'react-hook-form';

export interface IFormInputOTPProps<T extends FieldValues> extends InputProps {
  name: FieldPath<T>;
  required?: boolean;
}
