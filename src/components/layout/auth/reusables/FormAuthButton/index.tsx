// export const FormAuthButton = ({ label, id }: { label: string; id?: string }) => {
//   return (
//     <button
//       id={id}
//       type="submit"
//       className="py-3 px-6 gap-2 inline-flex items-center justify-center flex-nowrap border-0 border-solid cursor-progress min-h-[48px] text-base leading-6   font-medium text-white bg-[#111] rounded-[1000px] disabled:bg-[#e7e7e7]"
//       disabled
//     >
//       {label}
//     </button>
//   );
// };

interface ButtonProps {
  label: string;
  width?: string;
  disabled?: boolean;
  height?: string;
  id?: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
}

export const FormAuthButton: React.FC<ButtonProps> = ({
  label,
  width = '100%',
  backgroundColor = '#111111',
  disabled = false,
  color = '#ffffff',
  borderColor = '#ffffff',
  height,
  id,
}) => {
  return (
    <button
      disabled={disabled}
      className="py-3 px-6 gap-2 inline-flex items-center justify-center flex-nowrap border-solid border-[1px] border-[#111111] disabled:border-[#e7e7e7] cursor-pointer min-h-[48px] text-base leading-6   font-medium rounded-[1000px] bg-[#111111]   text-white   disabled:bg-[#e7e7e7]   disabled:cursor-default"
      type="submit"
      style={{
        width: width,
        height: '48px',
      }}
      id={id}
    >
      {label}
    </button>
  );
};
