interface LabelProps {
  label: string;
  id: string;
}

const Checkbox: React.FC<LabelProps> = ({ label, id }) => {
  return (
    <div className="flex items-center gap-[8px]">
      <input id={id} type="checkbox" className="body-paragraph w-[20px] h-[20px] border-solid border-[#838383]" />
      <label htmlFor={id} className="body-paragraph">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
