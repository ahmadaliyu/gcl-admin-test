import { ChangeEventHandler, useState } from 'react';

export const FormFieldSelect = ({
  fieldLabel,
  fieldName,
  state,
  onChange,
}: {
  fieldLabel?: string;
  fieldName?: string;
  state?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <div className="field relative">
      <label
        htmlFor={fieldLabel}
        className="field-label text-sm leading-[22px] lg:text-base text-[#838383] dark-text-[#717171] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-1.5rem)] lg:leading-6 font-normal   h-px w-px border-0 inset-0 p-0"
      >
        {fieldLabel}
      </label>
      <select
        name={fieldName}
        onChange={onChange}
        value={state}
        className="text-ellipsis appearance-none overflow-hidden min-h-[48px] max-h-[48px] py-3 px-[calc(0.75rem-1px)] border-solid border-[1px] border-[#838383] rounded-lg w-full text-sm leading-[22px] lg:text-base darkremove:border-none   focus:outline-none"
      >
        <option value=""> </option>
        <option value="nigeria">Nigeria</option>
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
      </select>
      <img
        src="/icons/ArrowDownIcon.svg"
        alt="Arrow Down Icon"
        className="absolute w-5 h-5 outline-none border-none bg-transparent right-5 top-[calc(50%-12px)]"
      />

      <div
        className={`field-label bg-white darkremove:bg-transparent text-sm leading-[22px] lg:text-base text-[#838383] darkremove:text-[#717171] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-24px)] lg:leading-6 font-normal   translate-y-1/2 mx-3`}
      >
        {fieldLabel}
      </div>
    </div>
  );
};
