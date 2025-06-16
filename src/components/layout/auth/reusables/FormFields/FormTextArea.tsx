import { ChangeEventHandler } from 'react';

export const FormTextAreaText = ({
  fieldLabel,
  fieldName,
  classInput,
  classInputFocus,
  state,
  onChange,
  placeholder,
}: {
  fieldLabel?: string;
  fieldName?: string;
  classInput?: string;
  classInputFocus?: string;
  state?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  type?: string;
  placeholder: string;
}) => {
  return (
    <div className="flex-1">
      <div className="field h-[120px] relative flex-1">
        <label
          htmlFor={fieldName}
          className="field-label text-[#838383] text-sm leading-[22px] lg:text-base whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-0 lg:leading-6 font-normal   h-px w-px border-0 inset-0 p-0"
        >
          {fieldLabel}
        </label>
        <textarea
          id={fieldName}
          name={fieldName}
          className={`${classInput} field-input focus:outline-none cursor-text text-ellipsis text-sm leading-[22px] lg:text-base overflow-hidden py-3 px-[calc(0.75rem-1px)] border-solid border-[1px] border-[#838383] rounded-lg w-full resize-none min-h-[120px]   darkremove:border-none`}
          onChange={onChange}
          value={state}
          placeholder={placeholder}
        ></textarea>
        <div
          className={`${classInputFocus} duration-150 text-sm leading-[22px] lg:text-base text-[#838383] bg-white darkremove:bg-transparent whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-0 lg:leading-6 font-normal   translate-y-1/2  mx-3`}
        >
          {fieldLabel}
        </div>
      </div>
      {/* <div className="mt-1   text-xs leading-5 font-normal text-[#FF0000]">Please enter your name</div> */}
    </div>
  );
};
