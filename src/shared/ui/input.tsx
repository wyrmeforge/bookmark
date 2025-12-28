import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  max?: number;
  hideMaxValue?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startAdornment,
      endAdornment,
      max,
      hideMaxValue,
      ...props
    },
    ref
  ) => {
    const withMaxPlaceholder =
      typeof max === "number" && max !== Number.POSITIVE_INFINITY;
    return (
      <div className="relative w-full">
        {startAdornment && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
            {startAdornment}
          </div>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            { "pr-8": endAdornment },
            { "pl-8": startAdornment },
            { "pr-14": withMaxPlaceholder && !hideMaxValue },
            className
          )}
          ref={ref}
          type={type}
          {...props}
        />
        {withMaxPlaceholder && !hideMaxValue && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-[calc(50%-30px)] bottom-0 flex h-full select-none items-center gap-0.5 py-2 pt-[10px] text-gray-400 text-sm md:right-14"
          >
            <span className="pr-1 text-sm">/</span> {max}
          </div>
        )}
        {endAdornment && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
