import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className='relative w-full'>
        {startAdornment && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2 transform'>
            {startAdornment}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            startAdornment ? 'pl-8' : '',
            endAdornment ? 'pr-8' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 transform'>
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
