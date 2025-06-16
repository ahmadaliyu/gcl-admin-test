import { Cross1Icon, CrossCircledIcon } from '@radix-ui/react-icons';
import React, { useEffect } from 'react';

function Alert({ message, type = 'error', onClose }: { message: string; type?: 'success' | 'error'; onClose?: any }) {
  const noMessage = !message || !message?.length || !message?.trim()?.length || typeof message !== 'string';

  useEffect(() => {
    if (!noMessage) {
      setTimeout(() => {
        onClose?.();
      }, 4000);
    }
  }, [noMessage]);

  if (noMessage) return null;

  return (
    <div className="w-full py-[8px] text-[#FF0000] bg-[#FFEAEA] flex items-center justify-center gap-[12px] mb-[24px] rounded-[4px] px-[30px] relative">
      <img src="/icons/info-circle-red.svg" alt="error" />
      <span className="text-[13px] leading-[24px] text-center">{message}</span>
      {typeof onClose === 'function' ? (
        <button className="absolute top-[-5px] right-[-5px]" onClick={() => onClose?.()}>
          <CrossCircledIcon />
        </button>
      ) : null}
    </div>
  );
}

export default Alert;
