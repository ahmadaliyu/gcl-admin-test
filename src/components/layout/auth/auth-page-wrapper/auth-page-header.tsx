import Link from 'next/link';
import React from 'react';

function AuthPageHeader({ title = 'title here', subtitle = 'subtitle here' }: { title?: string; subtitle?: string }) {
  return (
    <div className={`flex flex-col items-start justify-center gap-2 w-full pb-4`}>
      <h1 className="p-0 m-0 text-center w-full   text-[32px] medium leading-[42px] text-[#111111] font-[500]">
        {title}
      </h1>
      <h2 className="p-0 m-0 text-center w-full text-base   font-normal text-[#4e4e4e] ">{subtitle}</h2>
    </div>
  );
}

export default AuthPageHeader;
