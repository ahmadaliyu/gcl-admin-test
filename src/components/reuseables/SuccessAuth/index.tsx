import React from 'react';
import Link from 'next/link';

export default function SuccessAuth({ message }: { message?: string }) {
  return (
    <div className="md:w-[510px] md:mx-auto ">
      <div className="flex flex-col gap-y-12 items-center">
        <div>
          <img src="/icons/CheckCircleIcon.svg" alt="Success" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-[34px] text-[#111] font-medium leading-[42px] text-center">Success!</h1>
          <p className="text-base text-[#4e4e4e] font-normal   text-center">{message}</p>
        </div>
        <Link
          href="/auth/sign-in"
          className="w-full rounded-[1000px] text-center inline-block bg-[#111] p-3 px-6 text-base   text-[#fafafa] font-medium"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
