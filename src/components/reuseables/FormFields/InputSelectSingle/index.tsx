'use client';

import * as React from 'react';

import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import './style.css';
import Spinner from '@/components/reuseables/Spinner';
import { useDebounce } from '@/hooks/form/useDebounce';

export type TOnChangeSingleSelectProps = (props: { inputName: string; newValue?: any }) => void;

export default function CustomSelect({
  data = [],
  value = {},
  onChange = () => null,
  onDebounceInputTextChange = () => null,
  data_label = 'label',
  data_unique_key = 'value',
  placeholder = '',
  disabled,
  name,
  label,
  required,
  loading,
}: {
  data?: any;
  value: object;
  onChange?: TOnChangeSingleSelectProps;
  onDebounceInputTextChange?: (value: string | number) => void;
  data_label?: string;
  data_unique_key?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  label?: string;
  required?: boolean;
  loading?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const defaultInputValue = value?.[data_label || ''] || '';

  const [inputValue, setInputValue] = React.useState(defaultInputValue);

  React.useEffect(() => {
    setInputValue(defaultInputValue);
  }, [value]);

  const change = (value: object) => {
    onChange({ inputName: name || '', newValue: value });
  };

  useDebounce({ initialValue: inputValue, onChange: onDebounceInputTextChange });

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  return (
    <>
      <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
        <div className="cvspan-outlined-inputs">
          <CommandList />
          <CommandPrimitive.Input
            ref={inputRef}
            name={name}
            disabled={disabled}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => {
              setOpen(false);
              setInputValue(defaultInputValue);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            required={required}
          />
          <label htmlFor={name}>{label}</label>
          {loading ? (
            <div className="absolute w-full z-20 top-0 h-full pointer-events-none flex items-center justify-end">
              <Spinner className="text-gray-400" />
            </div>
          ) : null}
        </div>

        <div className="relative">
          {open && data.length > 0 ? (
            <div className="absolute w-full z-20 top-0 rounded-md border-[1px]   notificationContainer bg-popover text-popover-foreground shadow-md outline-none animate-in bg-white">
              <CommandGroup className="h-full overflow-auto">
                <CommandList>
                  {!data?.length || typeof data !== 'object'
                    ? null
                    : data.map((item?: any) => {
                        return (
                          <CommandItem
                            disabled={disabled}
                            key={item[data_unique_key]}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={() => {
                              setInputValue(defaultInputValue);
                              change(item);
                              setOpen(false);
                            }}
                            className={'cursor-pointer'}
                          >
                            {item[data_label]}
                          </CommandItem>
                        );
                      })}
                </CommandList>
              </CommandGroup>
            </div>
          ) : null}
        </div>
      </Command>
    </>
  );
}
