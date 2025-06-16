import React, { useEffect, useState } from 'react';
import './styleWIthDark.css';

export type TOnChangeInputTextProps = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type TOnBlurInputTextProps = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

function InputTextWithDarkMode({
  type = 'text',
  name = '',
  placeholder = '',
  label = '',
  value = '',
  onChange,
  onBlur,
  onFocus,
  textarea = false,
  required = false,
  disabled = false,
  pre,
  preWidth = '70px',
  className = '',
}: {
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: TOnChangeInputTextProps;
  onBlur?: TOnBlurInputTextProps;
  onFocus?: TOnBlurInputTextProps;
  textarea?: boolean;
  required?: boolean;
  disabled?: boolean;
  pre?: any;
  preWidth?: string;
  className?: string;
}) {
  const [thisType, setthisType] = useState<string>(type);

  useEffect(() => {
    setthisType(type);
  }, [type]);

  const togglePassword = () => {
    setthisType((prevState) => {
      return prevState === 'password' ? 'text' : 'password';
    });
  };

  if (textarea)
    return (
      <div className="cvspan-outlined-textareas">
        <textarea
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );

  return (
    <div className="cvspan-outlined-inputs ">
      {pre ? (
        <div className="absolute left-0 top-0 h-full px-[12px] flex items-center justify-center opacity-50">
          {typeof pre === 'string' ? <span>{pre}</span> : pre}
        </div>
      ) : null}
      <input
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        type={thisType}
        style={{
          paddingLeft: typeof pre === 'string' && pre?.length ? preWidth : '',
        }}
        className={className}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {type === 'password' ? (
        <button
          type="button"
          aria-label={`${thisType === 'password' ? 'Hide' : 'Reveal'} Password`}
          className="absolute w-5 h-5 outline-none border-none bg-transparent right-5 top-[calc(50%-12px)]"
          onClick={togglePassword}
        >
          {thisType === 'password' ? (
            <img src="/icons/EyeOffIcon.svg" alt="Hide Password" />
          ) : (
            <img src="/icons/EyeIcon.svg" alt="Reveal Password" />
          )}
        </button>
      ) : null}
      <label htmlFor={name} className="darkremove:bg-[#121212]">
        {label}
      </label>
    </div>
  );
}

export default InputTextWithDarkMode;
