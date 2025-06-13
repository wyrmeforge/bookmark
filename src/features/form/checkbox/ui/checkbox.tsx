import { cn } from '@/shared/lib/utils';
import { FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Switch } from '@/shared/ui/switch';
import { FormCheckboxProps } from '../model/types';

const FormCheckbox = <T extends FieldValues = FieldValues>({
  control,
  name,
  disabled,
  label,
}: FormCheckboxProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex w-full flex-row items-center justify-between rounded-md border p-3'>
        <FormLabel className={cn({ 'text-muted': disabled })}>
          {label}
        </FormLabel>
        <FormControl>
          <Switch
            disabled={disabled}
            className='!mt-0'
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export { FormCheckbox };
