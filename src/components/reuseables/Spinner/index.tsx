import React from 'react';

import { cn } from '@/lib/utils';

type IconProps = React.HTMLAttributes<SVGElement>;
const SvgSpinner = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

function Spinner({ className }: { className?: string }) {
  return <SvgSpinner className={cn('mr-2 h-4 w-4 animate-spin', className || '')} />;
}

export default Spinner;
