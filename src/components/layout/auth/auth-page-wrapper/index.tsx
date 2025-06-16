'use client';
import React from 'react';
import AuthPageHeader from './auth-page-header';
import CustomSvg from '@/components/reuseables/CustomSVG';
import Link from 'next/link';

function AuthPageWrapper({
  children,
  title = '',
  subtitle = '',
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      <div className="w-full min-h-screen lg:h-screen bg-[#111111] px-5  flex flex-col pt-[30px] gap-[30px] items-center lg:overflow-x-hidden">
        <div
          className="relative w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[30px] flex-1  justify-start
          bg-contain bg-no-repeat bg-left-bottom items-center lg:overflow-x-hidden"
          style={{
            backgroundSize: '500px 390px',
          }}
        >
          <img src="/icons/map-base.png" className="absolute bottom-0 left-0 pointer-events-none" alt="bg" />

          <div className="flex-1 w-full md:max-w-[600px] max-h-[600px] flex flex-col h-full ">
            <Link href="/">
              <CustomSvg id="logo-long" className="w-[140px] h-[25px] fill-[white]  " />
            </Link>
            <p className="text-white max-lg:hidden text-[clamp(48px,calc(60/1200*100vw),60px)] leading-[1.1] font-bold mt-[80px]">
              Connect great designs with great designers
            </p>
          </div>
          <div className="shrink-0 h-full flex flex-col items-center justify-center flex-1 bg-white relative w-full md:max-w-[600px]  md:max-h-[600px] rounded-[32px] px-[24px]  py-[30px]">
            <AuthPageHeader title={title} subtitle={subtitle} />
            {children}
          </div>
        </div>
        <div className="w-full max-w-[1200px] mx-auto flex flex-wrap gap-[30px] border-t-[#292929] border-t-[1px] py-[25px] text-white items-center justify-between ">
          <p className="flex flex-wrap items-center gap-2 text-sm md:text-base">
            <span>© 2024 Webbie.</span> <span>All rights reserved.</span>
          </p>

          <div className="flex items-center justify-between gap-[32px] text-sm md:text-base">
            <Link className="hover:underline" href="/legal/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:underline" href="/legal/cookies">
              Cookie Policy
            </Link>
            <Link className="hover:underline" href="/legal/terms-and-conditions">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPageWrapper;
