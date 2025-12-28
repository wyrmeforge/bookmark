import { CircleMinusIcon, CirclePlusIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "./button";
import { Input } from "./input";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  hideMaxValue?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

export function NumberInput({
  value,
  onChange,
  min = 0,
  hideMaxValue,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  placeholder = "-",
  disabled,
}: NumberInputProps) {
  const changeValue = useCallback(
    (delta: number) => {
      const next = Math.min(max, Math.max(min, value + delta));
      onChange(next);
    },
    [value, onChange, min, max]
  );

  return (
    <div className="flex items-center gap-1">
      <Input
        className="h-12 rounded-3xl text-center"
        disabled={disabled}
        endAdornment={
          <div>
            <Button
              className="m-0 h-10 w-10 rounded-full bg-transparent p-0 [&_svg]:size-6"
              disabled={value === max}
              onClick={() => changeValue(step)}
              size="icon"
              type="button"
              variant="secondary"
            >
              <CirclePlusIcon />
            </Button>
          </div>
        }
        hideMaxValue={hideMaxValue}
        inputMode="numeric"
        max={max}
        onChange={(e) => {
          const num = Number(e.target.value);
          if (!isNaN(num)) onChange(num);
        }}
        placeholder={placeholder}
        startAdornment={
          <Button
            className="m-0 h-10 w-10 rounded-full bg-transparent p-0 [&_svg]:size-6"
            disabled={value === min}
            onClick={() => changeValue(-step)}
            size="icon"
            type="button"
            variant="secondary"
          >
            <CircleMinusIcon />
          </Button>
        }
        type="text"
        value={value}
      />
    </div>
  );
}
