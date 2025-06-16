'use client';
import { useState } from 'react';
import DeleteAccountDialogContent from '@/components/reuseables/UserDeleteAccountDialog';
import { useTheme } from 'next-themes';

export const AccountItemCard = ({ item, children }: { item: any; children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="border-[1px] border-[#e7e7e7]   rounded-lg mt-4">
      <div className="p-4 relative">
        <div className="flex items-center lg:items-start">
          <div className="me-5 p-3 rounded-full border-[1px] border-[#e7e7e7]   border-solid bg-[#fafafa] darkremove:bg-transparent w-[48px] h-[48px]">
            {resolvedTheme === 'dark' ? (
              <img src={item.darkIcon} alt="User Icon" className="w-[24px] h-[24px]" />
            ) : (
              <img src={item.icon} alt="User Icon" className="w-[24px] h-[24px]" />
            )}
          </div>
          <div className="max-w-[325px] me-auto">
            <div className="text-[#111111]     text-base font-medium">{item.title}</div>
            <div className="hidden lg:mt-3 lg:block">
              <div className="text-[#4e4e4e] darkremove:text-[#838383] text-sm leading-[22px]   font-normal">
                {item.text}
              </div>
            </div>
          </div>
          <div className="flex items-center self-center">
            {resolvedTheme === 'dark' ? (
              <img src="/icons/DarkArrowRightIcon.svg" alt="Arrow Icon Right" />
            ) : (
              <img src="/icons/ArrowRightIcon.svg" alt="Arrow Icon Right" />
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export const AccountDeleteItemCard = ({ item }: { item: any }) => {
  const [open, setOpen] = useState<boolean | false>(false);
  const toggleOpen = (): void => {
    document.body.classList.add('h-screen');
    document.body.classList.add('overflow-hidden');
    setOpen(true);
  };
  const toggleClose = (): void => {
    document.body.classList.remove('h-screen');
    document.body.classList.remove('overflow-hidden');
    setOpen(false);
  };
  return (
    <>
      <AccountItemCard item={item}>
        <button
          type="button"
          className="inset-0 no-underline bg-transparent overflow-hidden absolute"
          onClick={toggleOpen}
        >
          <span className="w-px h-px absolute overflow-hidden">{item.title}</span>
        </button>
      </AccountItemCard>
      <DeleteAccountDialogContent onClose={toggleClose} open={open} />
    </>
  );
};
