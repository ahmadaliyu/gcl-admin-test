import React from 'react';

interface FileProps {
  placeholder: any;
  width?: string;
}
const FileInput: React.FC<FileProps> = ({ placeholder, width = '100%' }) => {
  return (
    <div className="relative border-dashed cursor-pointer h-[48px] rounded-[8px] bg-[#F3F3F3] border-[#838383]">
      <input
        type="file"
        className="border-dashed h-full bg-[#F3F3F3] border-[#838383]"
        placeholder={placeholder}
        style={{ width: width }}
        title={placeholder}
      />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative -inset-[41px] left-full -ml-[40px]"
      >
        <g clipPath="url(#clip0_2883_4054)">
          <path
            d="M14.168 7.50165C15.9805 7.51174 16.9621 7.59211 17.6024 8.23243C18.3346 8.96467 18.3346 10.1432 18.3346 12.5002V13.3335C18.3346 15.6906 18.3346 16.8691 17.6024 17.6013C16.8702 18.3335 15.6917 18.3335 13.3346 18.3335H6.66797C4.31095 18.3335 3.13243 18.3335 2.4002 17.6013C1.66797 16.8691 1.66797 15.6906 1.66797 13.3335L1.66797 12.5002C1.66797 10.1432 1.66797 8.96467 2.4002 8.23243C3.04052 7.59211 4.02211 7.51174 5.83464 7.50165"
            stroke="#717171"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 12.5L10 1.66667M10 1.66667L12.5 4.58333M10 1.66667L7.5 4.58333"
            stroke="#717171"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2883_4054">
            <rect width="20" height="20" rx="5" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span className="relative -inset-[62px] z-10 ml-[75px] text-[#838383]">{placeholder}</span>
    </div>
  );
};

export default FileInput;
