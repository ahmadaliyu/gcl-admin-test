import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function CustomTooltip({
  children,
  content,
  delayDuration = 200,
}: {
  children?: React.ReactNode;
  content?: any;
  delayDuration?: number;
}) {
  if (!content) return children;
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{typeof content === 'string' ? <p>{content}</p> : content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CustomTooltip;
