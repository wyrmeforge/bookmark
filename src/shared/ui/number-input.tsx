import { CircleMinusIcon, CirclePlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import { Button } from './button';
import { Input } from './input';

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  placeholder = '0',
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
    <div className='space-y-2'>
      <div className='flex items-center gap-1'>
        <Input
          type='text'
          startAdornment={
            <Button
              type='button'
              variant='secondary'
              size='icon'
              disabled={value === min}
              className='m-0 h-8 w-8 rounded-full bg-transparent p-0'
              onClick={() => changeValue(-step)}
            >
              <CircleMinusIcon className='h-6 w-6' />
            </Button>
          }
          endAdornment={
            <Button
              type='button'
              variant='secondary'
              size='icon'
              disabled={value === max}
              className='m-0 h-8 w-8 rounded-full bg-transparent p-0'
              onClick={() => changeValue(step)}
            >
              <CirclePlusIcon className='h-6 w-6' />
            </Button>
          }
          inputMode='numeric'
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className='rounded-3xl text-center'
          onChange={(e) => {
            const num = Number(e.target.value);
            if (!isNaN(num)) onChange(num);
          }}
        />
      </div>
    </div>
  );
}
