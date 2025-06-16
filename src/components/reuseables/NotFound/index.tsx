'use client';
import Button from '@/components/reuseables/Button';

export default function NotFound({
  title = `Page Not Found`,
  description = `Sorry, we couldn’t find the page you’re looking for.`,
  errorCode = '404',
}: {
  title?: string;
  description?: string;
  errorCode?: string;
}) {
  return (
    <div className="w-full h-fit flex flex-col gap-10 justify-center items-center pt-[92px] lg:py-[130px] relative max-w-[1336px] mx-auto">
      {!errorCode ? null : <p className="text-[96px] md:text-[250px] font-medium leading-none">{errorCode}</p>}
      <div className="flex flex-col justify-center items-center h-fit w-fit">
        <p className="text-[24px] md:text-[48px] font-medium">{title}</p>
        <p className="text-[16px] md:text-[18px] font-medium pb-[32px] text-[#4E4E4E] max-w-[700px] text-center">
          {description}
        </p>

        <a href="/" className="hover:cursor-pointer w-fit">
          <Button variant="dark" title="Back to Home" height="48px" type="button" />
        </a>
      </div>
      <img src="/images/thinking.svg" alt="thinking" className="hidden lg:block absolute right-0 bottom-0" />
      <img src="/images/thinking-mobile.svg" alt="thinking" className="w-[70%] lg:hidden" />
    </div>
  );
}
