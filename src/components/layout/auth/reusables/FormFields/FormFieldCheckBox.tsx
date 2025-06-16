import { ChangeEvent } from 'react';
import { useField } from 'formik';

const FormFieldCheckBox = ({ name, label, id }: { name: string; label: string; id?: string }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked ? true : false;
    setValue(isChecked);
  };
  return (
    <div className="flex flex-nowrap relative">
      <input
        {...field}
        type="checkbox"
        id={id && id}
        className="flex-shrink-0 cursor-pointer w-5 h-5 mr-2 bg-white border-[1px] border-solid border-[#838383] opacity-0 absolute"
        onChange={onChecked}
      />
      <span
        className={`flex-shrink-0 cursor-pointer pointer-events-none mr-2 w-5 h-5 relative rounded border-[1px] border-solid border-[#838383] ${
          value === true ? 'bg-[#1d1d1d]  ' : 'bg-white  '
        }`}
      >
        {value && (
          <svg
            className="align-top w-full h-full fill-[#ffffff] darkremove:fill-[#111111]"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
          </svg>
        )}
      </span>
      <div className="text-[#4e4e4e] text-base   flex-grow-1">
        <label htmlFor={id} className="cursor-pointer text-base   font-normal text-[#4e4e4e]">
          <p className="checkbox-label-content cursor-pointer text-base   font-normal text-[#4e4e4e]">{label}</p>
        </label>
      </div>
    </div>
  );
};

export { FormFieldCheckBox };
