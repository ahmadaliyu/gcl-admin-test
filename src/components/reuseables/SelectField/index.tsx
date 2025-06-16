import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  placeholder: string;
  options: Option[];
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  isPhoneInput?: boolean;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder,
  options,
  disabled = false,
  value = '',
  onChange,
  isPhoneInput = false,
  className = '',
}) => {
  return (
    <div className={`font-poppins w-full border border-[#CCD6DF] rounded-[10px] h-[61px] py-[8px] px-[16px] ${disabled ? 'bg-[#F5F5F5]' : 'bg-white'} ${className}`}>
      <Select
        disabled={disabled}
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full h-full p-0 border-0 bg-transparent hover:bg-transparent focus:ring-0">
          <div className="flex flex-col items-start w-full gap-1">
            <p className="text-[#0088DD] text-[12px] leading-none">{label}</p>
            <div className="flex w-full items-center justify-between">
              {isPhoneInput && value ? (
                <div className="flex items-center text-[12px] text-[#272727]">
                  <span className="mr-2">{value.split(' ')[0]}</span>
                  {value.split(' ')[1]}
                </div>
              ) : (
                <SelectValue asChild>
                  <span className={`text-[12px] ${value ? 'text-[#272727]' : 'text-[#757575]'}`}>
                    {value || placeholder}
                  </span>
                </SelectValue>
              )}
              <img
                src="/icons/chevron-down.png"
                className={`h-[24px] w-[24px] ml-2 ${disabled ? 'opacity-50' : ''}`}
                alt="dropdown indicator"
              />
            </div>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          <SelectGroup>
            {options.length > 0 ? (
              options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-[12px]"
                >
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <SelectLabel className="text-[#757575] text-[12px]">
                No options available
              </SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
