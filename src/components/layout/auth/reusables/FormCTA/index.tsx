import Link from 'next/link';

export const FormCTA = ({ text, link, linkText }: { text: string; link: string; linkText: string }) => {
  return (
    <div className="text-center text-[#4e4e4e] text-sm   font-normal leading-[22px]">
      {text}
      {'   '}
      <Link href={`${link}`} aria-label="Log in" className="text-sm font-medium   leading-[22px]">
        {linkText}
      </Link>
    </div>
  );
};
