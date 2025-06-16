'use client';

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import Spinner from '../../Spinner';
import { useDebounce } from '@/hooks/form/useDebounce';

export type TOnChangeMultipleSelectProps = (props: { inputName: string; newValue: any[] }) => void;

export default function InputSelectMultiple({
  data = [],
  value = [],
  onChange = () => null,
  onDebounceInputTextChange = () => null,
  data_label = 'label',
  data_unique_key = 'value',
  placeholder = '',
  disabled,
  name,
  label,
  freeSolo = false,
  hideSuggestions = false,
  loadingSuggestions = false,
  helperText = '',
}: {
  data?: any;
  value: any[];
  onChange?: TOnChangeMultipleSelectProps;
  onDebounceInputTextChange?: (value: string | number) => void;
  data_label?: string;
  data_unique_key?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  label?: string;
  freeSolo?: boolean;
  hideSuggestions?: boolean;
  loadingSuggestions?: boolean;
  helperText?: string;
}) {
  const change = (value: any[]) => {
    onChange({ inputName: name || '', newValue: value });
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  useDebounce({ initialValue: inputValue, onChange: onDebounceInputTextChange });

  const handleUnselect = React.useCallback(
    (item?: any) => {
      const newValue: any[] = !Array.isArray(value)
        ? []
        : value.filter((s?: any) => s[data_unique_key] !== item[data_unique_key]);

      change(newValue);
    },
    [value]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (freeSolo) {
          if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            const newValue: any[] = [...(value || []), { [data_label]: target.value, [data_unique_key]: target.value }];
            change(newValue);
            setInputValue('');
          }
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input?.value === '') {
            const newValue: any[] = [...(value || [])];
            newValue.pop();
            change(newValue);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [value]
  );

  const selectables = data?.length ? data.filter((item?: any) => !value.includes(item)) : [];

  return (
    <>
      <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
        <div className="group  p-[12px] text-sm ring-offset-background border-none rounded-[8px] w-full outline outline-[#D0D0D0] outline-[1px] text-[#111111] darkremove:outline-none  ">
          <div className="flex gap-1 flex-wrap">
            {!value?.length || typeof value !== 'object' || !Array.isArray(value)
              ? null
              : value.map((item?: any) => {
                  return (
                    <Badge
                      key={item[data_unique_key]}
                      variant="secondary"
                      className="bg-[#F3F3F3] text-[#111111] font-normal"
                    >
                      {item[data_label]}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[#111111] font-normal
                     bg-[#838383] p-[3px]
                      "
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUnselect(item);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnselect(item);
                        }}
                      >
                        <Cross2Icon className="w-2 h-2 text-white " />
                      </button>
                    </Badge>
                  );
                })}

            <CommandList />
            <CommandPrimitive.Input
              ref={inputRef}
              disabled={disabled}
              name={name}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => {
                setOpen(false);
                setInputValue('');
              }}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="bg-transparent outline-none placeholder:text-[#838383] flex-1 text-[#111111] text-[16px] font-normal   darkremove:bg-none"
            />

            {!hideSuggestions ? (
              loadingSuggestions ? (
                <Spinner className="text-gray-400" />
              ) : (
                <img
                  src="/icons/ArrowDownIcon.svg"
                  alt="Arrow Down Icon"
                  className=" w-5 h-5 outline-none border-none ml-auto"
                />
              )
            ) : null}
          </div>
        </div>

        <div className={cn('relative', !hideSuggestions ? '' : 'hidden')}>
          {open ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in bg-white">
              {selectables.length > 0 ? (
                <CommandGroup className="h-full overflow-auto">
                  <CommandList>
                    {!selectables?.length || typeof selectables !== 'object'
                      ? null
                      : selectables.map((item?: any) => {
                          return (
                            <CommandItem
                              disabled={disabled}
                              key={item[data_unique_key]}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                setInputValue('');
                                change([...(value || []), item]);
                              }}
                              className={'cursor-pointer'}
                            >
                              {item[data_label]}
                            </CommandItem>
                          );
                        })}
                  </CommandList>
                </CommandGroup>
              ) : (
                <div className="w-full p-[30px] flex items-center justify-center flex-col gap-[5px]">
                  <img src="/icons/folder-gray.svg" alt="Empty icon" className=" w-[30px] h-[30px] " />
                  <p className="text-sm">No results found!</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Command>

      {!helperText ? null : <p className="text-[#4E4E4E] text-[12px] mt-[-15px]">{helperText}</p>}
    </>
  );
}
