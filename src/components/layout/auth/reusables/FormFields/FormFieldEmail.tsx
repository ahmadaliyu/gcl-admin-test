import { useField } from 'formik';
import { FormFieldError } from './FormFieldError';

export const FormFieldEmail = ({
  fieldLabel,
  fieldName,
  classInput,
  classInputFocus,
  type = 'email',
  autoComplete = 'off',
}: {
  fieldLabel: string;
  fieldName: string;
  classInput: string;
  classInputFocus: string;
  type: string;
  autoComplete?: string;
}) => {
  const [field, meta] = useField(fieldName);
  const { touched, error } = meta;

  return (
    <div className="flex-1">
      <div className={`field relative flex-1 `}>
        <label
          htmlFor={fieldName}
          className="field-label text-[#838383] text-sm leading-[22px] lg:text-base whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-1.5rem)] lg:leading-6 font-normal   h-px w-px border-0 inset-0 p-0"
        >
          {fieldLabel}
        </label>
        <input
          {...field}
          type={type}
          id={fieldName}
          autoComplete={autoComplete}
          placeholder=" "
          className={`${classInput} focus:outline-none cursor-text text-ellipsis overflow-hidden min-h-[48px] max-h-[48px] py-3 px-[calc(0.75rem-1px)] border-solid border-[1px] border-[#838383] rounded-lg w-full text-sm leading-[22px] lg:text-base ${
            touched && error ? 'border-[#f00]' : ''
          }`}
        />
        <div
          className={`${classInputFocus} duration-150 field-label scale-75 origin-[0] text-sm leading-[22px] lg:text-base bg-white text-[#838383] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-24px)] lg:leading-6 font-normal   -translate-y-1/2 mx-3 `}
          aria-hidden
        >
          {fieldLabel}
        </div>
      </div>
      <FormFieldError meta={meta} />
    </div>
  );
};
