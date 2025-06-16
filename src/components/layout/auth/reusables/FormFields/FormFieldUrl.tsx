import { ChangeEventHandler } from 'react';

export const FormFieldUrl = ({
  fieldLabel,
  fieldName,
  placeholderText,
  mobileFieldLabel,
  mobilePlaceholderText,
  classInput,
  classInputFocus,
  id,
}: {
  fieldLabel: string;
  fieldName: string;
  placeholderText: string;
  mobileFieldLabel?: string;
  mobilePlaceholderText?: string;
  classInput?: string;
  classInputFocus?: string;
  id: string;
}) => {
  return (
    <div className="relative">
      <div className="flex relative">
        <label
          htmlFor="linkedin"
          className="flex items-center  field-label text-[#4e4e42] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none text-base font-normal   absolute h-px w-px border-0 inset-0 p-0"
        >
          {fieldLabel}
        </label>
        <div className="hidden lg:flex items-center bg-[#f3f3f3]   rounded-tl-lg rounded-bl-lg basis-[172px] p-3">
          <div className="field-label text-[#4e4e42] darkremove:text-[#838383] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none text-base font-normal  ">
            {fieldLabel}
          </div>
        </div>
        <input
          type="text"
          name={fieldName}
          id={id}
          className={`${classInput} flex-1 p-3 text-base   bg-white   rounded-lg lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg border-[1px] border-solid border-[#838383] darkremove:border-none focus:outline-none`}
          placeholder={placeholderText}
        />

        <div
          className={`${classInputFocus} duration-150 text-[#111111] darkremove:text-[#717171] bg-white   whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-24px)] text-base font-normal   translate-y-1/2 mx-3 lg:hidden`}
        >
          {mobileFieldLabel}
        </div>
      </div>
    </div>
  );
};
