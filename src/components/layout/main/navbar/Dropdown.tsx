'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useLogout } from '@/hooks/api/auth';
import { useAuthContext } from '@/context/AuthContext';
import generateUserAvatarFalback from '@/utils/text/generateUserAvatarFalback';
import ThemeSwitcher from '@/components/reuseables/ThemeSwitcher';

const Dropdown = () => {
  const { onLogout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="w-fit lg:w-[103px] h-[60px] flex justify-evenly lg:border-[1px] border-[#e7e7e7]   rounded-full items-center">
            <span className="size-[40px] lg:size-[50px] cursor-pointer flex items-center justify-center rounded-full bg-slate-200">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  referrerPolicy="no-referrer"
                  alt="avatar"
                  className="w-full h-full rounded-full "
                />
              ) : (
                <span className="uppercase text-[18px]">{generateUserAvatarFalback({ user })}</span>
              )}
            </span>
            <span className="hidden lg:block cursor-pointer">
              <span className="text-black  ">
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
              </span>
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-[5px] rounded-[12px]    ">
          <div className="p-[16px]">
            <h1 className="font-medium text-[16px] leading-[24px] text-[#111111]   darkremove:text-[#ffffff] truncate">
              {user?.first_name || ''} {user?.last_name || ''}
            </h1>
            <p className="font-normal text-[14px] leading-[22px] text-[#4e4e4e]    darkremove:text-[#ffffff] lowercase truncate">
              {user?.email || '---'}
            </p>
          </div>
          <div className="bg-[#E7E7E7] w-full h-[1px]  " />

          <div className="flex-col gap-[24px] flex lg:hidden px-[24px] py-[24px]">
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
          <div className="flex lg:hidden bg-[#E7E7E7] w-full h-[1px]  " />
          <div className="flex-col gap-[18px] flex lg:hidden px-[16px] py-[24px]">
            <Link href="/user/submit-website">
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
          <div className="flex lg:hidden bg-[#E7E7E7] w-full h-[1px] px-[16px]  " />

          <div className="p-[4px]">
            <Link href="/user/my-account/my-profile">
              <DropdownMenuItem className="p-3">
                <div className="flex gap-2 items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current"
                  >
                    <circle cx="9" cy="4.5" r="3" strokeWidth="1.5" />
                    <path
                      d="M15 13.125C15 14.989 15 16.5 9 16.5C3 16.5 3 14.989 3 13.125C3 11.261 5.68629 9.75 9 9.75C12.3137 9.75 15 11.261 15 13.125Z"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>
                    <p className="font-medium text-[16px] leading-[24px]  ">Profile</p>
                  </span>
                </div>
              </DropdownMenuItem>
            </Link>
            <Link href="/user/account-settings">
              <DropdownMenuItem className="p-3">
                <div className="flex gap-2 items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current text-black  "
                  >
                    <circle cx="9" cy="9" r="2.25" strokeWidth="1.5" />
                    <path
                      d="M10.324 1.61418C10.0484 1.5 9.6989 1.5 8.99999 1.5C8.30108 1.5 7.95162 1.5 7.67597 1.61418C7.30842 1.76642 7.01641 2.05843 6.86417 2.42597C6.79468 2.59376 6.76748 2.78888 6.75684 3.07349C6.74119 3.49176 6.52669 3.87892 6.16421 4.0882C5.80173 4.29747 5.35919 4.28965 4.98915 4.09407C4.73733 3.96098 4.55475 3.88697 4.3747 3.86326C3.98028 3.81134 3.58139 3.91822 3.26577 4.1604C3.02906 4.34203 2.85433 4.64467 2.50487 5.24995C2.15542 5.85522 1.98069 6.15786 1.94174 6.45368C1.88982 6.8481 1.9967 7.24699 2.23888 7.56261C2.34942 7.70667 2.50478 7.82777 2.74589 7.97927C3.10035 8.20199 3.32842 8.58139 3.32839 9.00002C3.32837 9.41859 3.10031 9.79795 2.74589 10.0206C2.50474 10.1722 2.34936 10.2933 2.23881 10.4373C1.99663 10.753 1.88975 11.1518 1.94167 11.5463C1.98062 11.8421 2.15534 12.1447 2.5048 12.75C2.85426 13.3553 3.02899 13.6579 3.2657 13.8395C3.58131 14.0817 3.98021 14.1886 4.37463 14.1367C4.55467 14.113 4.73724 14.039 4.98903 13.9059C5.3591 13.7103 5.80167 13.7025 6.16417 13.9118C6.52668 14.1211 6.74119 14.5083 6.75684 14.9265C6.76748 15.2111 6.79468 15.4063 6.86417 15.574C7.01641 15.9416 7.30842 16.2336 7.67597 16.3858C7.95162 16.5 8.30108 16.5 8.99999 16.5C9.6989 16.5 10.0484 16.5 10.324 16.3858C10.6916 16.2336 10.9836 15.9416 11.1358 15.574C11.2053 15.4062 11.2325 15.2111 11.2432 14.9265C11.2588 14.5082 11.4733 14.1211 11.8357 13.9118C12.1982 13.7025 12.6408 13.7103 13.0109 13.9059C13.2627 14.0389 13.4452 14.1129 13.6253 14.1366C14.0197 14.1886 14.4186 14.0817 14.7342 13.8395C14.9709 13.6579 15.1457 13.3552 15.4951 12.7499C15.8446 12.1447 16.0193 11.842 16.0582 11.5462C16.1102 11.1518 16.0033 10.7529 15.7611 10.4373C15.6506 10.2932 15.4952 10.1721 15.2541 10.0206C14.8996 9.7979 14.6716 9.41852 14.6716 8.99993C14.6716 8.58139 14.8997 8.20206 15.2541 7.97939C15.4952 7.82786 15.6506 7.70674 15.7612 7.56266C16.0034 7.24705 16.1102 6.84815 16.0583 6.45373C16.0194 6.15791 15.8446 5.85528 15.4952 5.25C15.1457 4.64472 14.971 4.34209 14.7343 4.16045C14.4187 3.91827 14.0198 3.81139 13.6254 3.86331C13.4453 3.88702 13.2627 3.96102 13.011 4.0941C12.6409 4.28969 12.1983 4.29751 11.8358 4.08822C11.4733 3.87893 11.2588 3.49175 11.2431 3.07345C11.2325 2.78886 11.2053 2.59375 11.1358 2.42597C10.9836 2.05843 10.6916 1.76642 10.324 1.61418Z"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <span>
                    <p className="font-medium text-[16px] leading-[24px]  ">Settings</p>
                  </span>
                </div>
              </DropdownMenuItem>
            </Link>
            <Link href="/user/my-account/saved-websites">
              <DropdownMenuItem className="p-3">
                <div className="flex gap-2 items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current text-black  "
                  >
                    <path
                      d="M15.75 12.0682V8.32314C15.75 5.10668 15.75 3.49845 14.7615 2.49923C13.773 1.5 12.182 1.5 9 1.5C5.81802 1.5 4.22703 1.5 3.23851 2.49923C2.25 3.49845 2.25 5.10668 2.25 8.32314V12.0682C2.25 14.3906 2.25 15.5518 2.80058 16.0592C3.06316 16.3012 3.39461 16.4533 3.74769 16.4937C4.48801 16.5784 5.35255 15.8137 7.08162 14.2844C7.84592 13.6084 8.22806 13.2704 8.67021 13.1813C8.88793 13.1374 9.11207 13.1374 9.32979 13.1813C9.77194 13.2704 10.1541 13.6084 10.9184 14.2844C12.6474 15.8137 13.512 16.5784 14.2523 16.4937C14.6054 16.4533 14.9368 16.3012 15.1994 16.0592C15.75 15.5518 15.75 14.3906 15.75 12.0682Z"
                      strokeWidth="1.5"
                    />
                    <path d="M11.25 4.5H6.75" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>

                  <span>
                    <p className="font-medium text-[16px] leading-[24px]  ">Saved</p>
                  </span>
                </div>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={onLogout} className="p-3">
              <div className="flex gap-2 items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current text-black  "
                >
                  <path
                    d="M9 15C5.68629 15 3 12.3137 3 9C3 5.68629 5.68629 3 9 3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.5 9H15M15 9L12.75 6.75M15 9L12.75 11.25"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="font-medium text-[16px] leading-[24px]  ">Logout</p>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
