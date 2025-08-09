import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  max?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, max, ...props }, ref) => {
    const withMaxPlaceholder = typeof max === 'number' && max !== Infinity;
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
            { 'pr-8': endAdornment },
            { 'pl-8': startAdornment },
            { 'pr-14': withMaxPlaceholder },
            className
          )}
          ref={ref}
          {...props}
        />
        {withMaxPlaceholder && (
          <div
            aria-hidden='true'
            className='pointer-events-none absolute bottom-0 right-[calc(50%-30px)] top-0 flex h-full select-none items-center gap-0.5 py-2 pt-[10px] text-sm text-gray-400 md:right-14'
          >
            <span className='pr-1 text-sm'>/</span> {max}
          </div>
        )}
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
