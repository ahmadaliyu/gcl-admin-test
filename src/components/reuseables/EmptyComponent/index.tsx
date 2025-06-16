import { cn } from '@/lib/utils';
import React from 'react';

interface EmptyComponentProps {
  title?: string;
  description?: string;
  containerClassname?: string;
  buttonTitle?: string;
}

function EmptyComponent({
  title = 'No result found',
  description = 'We couldn’t find any matches!',
  containerClassname = '',
  buttonTitle,
}: EmptyComponentProps) {
  return (
    <div className={cn('w-full max-w-[320px] flex flex-col items-center justify-center mx-auto ', containerClassname)}>
      <img src="/icons/folder-gray.svg" alt="Empty icon" className="mb-[20px] w-[60px] h-[60px]" />

      <h3 className="text-[#111111] text-[24px] font-medium text-center">{title}</h3>
      <p className="text-[#4E4E4E] text-[14px] text-center font-[400]">{description}</p>
    </div>
  );
}

export default EmptyComponent;
