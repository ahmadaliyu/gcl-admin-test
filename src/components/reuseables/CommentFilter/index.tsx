'use client';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/comment-filter-dropdown';

type Props = {
  onFilterChange: (option: Option) => void;
};

type Option = 'All' | 'Recent' | 'Trending' | 'Oldest';

const CommentFilterDropdown: React.FC<Props> = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option>('All');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelection = (option: Option): void => {
    setSelectedOption(option);
    setIsOpen(false);
    onFilterChange(option);
  };

  const toggleDropdown = (): void => {
    setIsOpen((prev) => !prev);
    // console.log(isOpen);
  };

  useEffect(() => {
    console.log('Dropdown isOpen:', isOpen); // Logs when `isOpen` changes
  }, [isOpen]);

  const options: Option[] = ['All', 'Recent', 'Trending', 'Oldest'];

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="outline-none"
          // onPointerDown={toggleDropdown}
          // onClick={toggleDropdown}
        >
          <span className="flex items-center gap-[4px] cursor-pointer">
            <span className="text-[14px] leading-[22px] text-[#111111] darkremove:text-[#ffffff]">
              {selectedOption}
            </span>
            <img
              src={isOpen ? '/icons/up-chevron-dark.svg' : '/icons/down-chevron-dark.svg'}
              className={`w-[20px] h-[20px] transition-transform duration-200 darkremove:hidden`}
              alt="arrow"
            />
            <img
              src={isOpen ? '/icons/up-chevron-white.svg' : '/icons/down-chevron-white.svg'}
              className={`w-[20px] h-[20px] transition-transform duration-200 hidden darkremove:flex`}
              alt="arrow"
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-2 rounded-[12px] w-[159px]"
          style={{ boxShadow: '0px 0px 24px 0px rgba(0, 0, 0, 0.10)' }}
        >
          {options
            .filter((option) => option !== selectedOption)
            .map((option) => (
              <DropdownMenuItem key={option} onClick={() => handleSelection(option)}>
                <div className="flex gap-2 items-center">
                  <span>
                    <p className="text-[14px] leading-[24px]  ">{option}</p>
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommentFilterDropdown;
