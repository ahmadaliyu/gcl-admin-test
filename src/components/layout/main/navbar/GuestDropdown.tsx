'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import generateUserAvatarFalback from '@/utils/text/generateUserAvatarFalback';
import ThemeSwitcher from '@/components/reuseables/ThemeSwitcher';

const GuestDropdown = () => {
  const { user } = useAuthContext();

  // const [isOpen, setIsOpen] = useState(false);

  // const handleToggle = () => {
  //   setIsOpen(!isOpen);

  // onOpenChange={handleToggle}
  // };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="w-fit h-[60px] flex justify-evenly rounded-full items-center ">
            {/* <span className=""> */}
            <span className="text-black   block cursor-pointer">
              {/* {isOpen ? (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M18.0275 15L31.5 27.831L29.221 30L15.75 17.169L2.27747 30L0 27.831L13.471 15L0 2.169L2.27747 0L15.75 12.831L29.221 0L31.5 2.169L18.0275 15Z" />
                </svg>
              ) : ( */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M5 7.5H35V11.25H5V7.5ZM5 18.125H35V21.875H5V18.125ZM5 28.75H35V32.5H5V28.75Z" />
              </svg>
              {/* )} */}
              {/* </span> */}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-[5px] rounded-[12px]    ">
          <div className="flex-col gap-[24px] py-[24px] flex lg:hidden px-[24px]">
            {/* <Link href="/user/my-account/my-profile"> */}
            <div className="lg:hidden flex gap-2 items-center cursor-not-allowed">
              <span>
                <p className="font-medium text-[16px] leading-[24px]  ">Directory</p>
              </span>
            </div>
            {/* </Link> */}

            <div className="w-full flex flex-row items-center justify-between">
              <span>
                <p className="font-medium text-[16px] leading-[24px]  ">Theme</p>
              </span>
              <ThemeSwitcher />
            </div>
          </div>
          <div className="flex lg:hidden bg-[#E7E7E7] w-full h-[1px] px-[16px]  " />
          <div className="flex-col gap-[18px] flex lg:hidden px-[16px] py-[24px]">
            <Link href="/auth/sign-in">
              <button className="w-full flex flex-row justify-center items-center gap-2 bg-black   font-medium darkremove:text-black text-white hover:bg-[#292929] darkremove:hover:bg-[#E7E7E7] py-4 rounded-full px-[32px] text-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#111111] darkremove:fill-[#FFFFFF]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0013 3.33366C6.3194 3.33366 3.33464 6.31843 3.33464 10.0003C3.33464 13.6822 6.3194 16.667 10.0013 16.667C13.6832 16.667 16.668 13.6822 16.668 10.0003C16.668 6.31843 13.6832 3.33366 10.0013 3.33366ZM1.66797 10.0003C1.66797 5.39795 5.39893 1.66699 10.0013 1.66699C14.6037 1.66699 18.3346 5.39795 18.3346 10.0003C18.3346 14.6027 14.6037 18.3337 10.0013 18.3337C5.39893 18.3337 1.66797 14.6027 1.66797 10.0003ZM10.0013 6.66699C10.4615 6.66699 10.8346 7.04009 10.8346 7.50033V9.16699H12.5013C12.9615 9.16699 13.3346 9.54009 13.3346 10.0003C13.3346 10.4606 12.9615 10.8337 12.5013 10.8337H10.8346V12.5003C10.8346 12.9606 10.4615 13.3337 10.0013 13.3337C9.54106 13.3337 9.16797 12.9606 9.16797 12.5003V10.8337H7.5013C7.04107 10.8337 6.66797 10.4606 6.66797 10.0003C6.66797 9.54009 7.04107 9.16699 7.5013 9.16699H9.16797V7.50033C9.16797 7.04009 9.54106 6.66699 10.0013 6.66699Z"
                    fill="currentColor"
                  />
                </svg>

                <p>Submit Site</p>
              </button>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GuestDropdown;
