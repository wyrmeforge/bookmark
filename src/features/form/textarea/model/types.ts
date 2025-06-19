import { FieldPath, FieldValues } from 'react-hook-form';

export interface IFormTextareaProps<T extends FieldValues>
  extends React.ComponentProps<'textarea'> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
}
