import { useState } from 'react';
import { useField } from 'formik';
import { FormFieldError } from './FormFieldError';

export const FormFieldPassword = ({
  fieldLabel,
  fieldName,
  classInput,
  classInputFocus,
  type = 'password',
}: {
  type: string;
  fieldLabel: string;
  fieldName: string;
  classInput: string;
  classInputFocus: string;
  autoComplete?: string;
}) => {
  const [field, meta] = useField(fieldName);
  const { touched, error } = meta;
  const [hidePassword, setHidePassword] = useState<boolean | true>(true);

  const togglePassword = () => setHidePassword((prevState: boolean) => !prevState);
  return (
    <div className="flex-1">
      <div className="field relative">
        <label
          htmlFor={fieldLabel}
          className="field-label text-sm leading-[22px] lg:text-base text-[#838383] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-1.5rem)] lg:leading-6 font-normal   h-px w-px border-0 inset-0 p-0"
        >
          {fieldLabel}
        </label>
        <input
          {...field}
          id={fieldLabel}
          className={`${classInput} focus:outline-none cursor-text text-sm leading-[22px] lg:text-base text-ellipsis overflow-hidden min-h-[48px] max-h-[48px] py-3 px-[calc(0.75rem-1px)] border-solid border-[1px] border-[#838383] rounded-lg w-full ${
            touched && error ? 'border-[#f00]' : ''
          }`}
          autoComplete="off"
          placeholder=" "
          type={hidePassword === true ? type : 'text'}
        />
        <button
          type="button"
          aria-label={`${hidePassword ? 'Hide' : 'Reveal'} Password`}
          className="absolute w-5 h-5 outline-none border-none bg-transparent right-5 top-[calc(50%-12px)]"
          onClick={togglePassword}
        >
          {hidePassword ? (
            <img src="/icons/EyeOffIcon.svg" alt="Hide Password" />
          ) : (
            <img src="/icons/EyeIcon.svg" alt="Reveal Password" />
          )}
        </button>
        <div
          className={`${classInputFocus} duration-150 field-label scale-75 origin-[0] text-sm leading-[22px] lg:text-base bg-white text-[#838383] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-24px)] lg:leading-6 font-normal   -translate-y-1/2 mx-3  `}
          aria-hidden
        >
          {fieldLabel}
        </div>
      </div>
      <FormFieldError meta={meta} />
    </div>
  );
};
