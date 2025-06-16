interface LabelProps {
  label: any;
  id: string;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
}

const InputCheckbox: React.FC<LabelProps> = ({ label, id, onChange, checked = false, className }) => {
  return (
    <button type="button" className="flex items-center gap-[8px]" onClick={() => onChange?.()}>
      <div className="relative h-[20px]  w-[20px]">
        <input
          checked={checked}
          id={id}
          type="checkbox"
          className="body-paragraph h-full w-full border-solid border-[#1D1D1D] peer cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border checked:bg-[#1D1D1D] checked:border-[#1D1D1D] darkremove:border-[#838383] darkremove:bg-[#FFFFFF]"
        />
        <span className="absolute text-white darkremove:text-[#1D1D1D] opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>

      {typeof label === 'string' ? (
        <label htmlFor={id} className="body-paragraph text-[15px]">
          {label}
        </label>
      ) : (
        label
      )}
    </button>
  );
};

export default InputCheckbox;
