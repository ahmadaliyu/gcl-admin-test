'use client';

import { toast } from 'sonner';
import Router from 'next/navigation';

export const showSuccessToast = ({
  message,
  description,
  position = 'top-right',
  duration = 3000,
  closeButton = true,
}: {
  message?: string;
  duration?: number;
  description?: string;
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
  closeButton?: boolean;
}) => {
  return toast(`${message}`, {
    position,
    description,
    duration,
    closeButton,
  });
};

export const showErrorToast = ({
  message,
  description,
  position = 'top-right',
  duration = 3000,
  closeButton = true,
}: {
  message?: string;
  duration?: number;
  description?: string;
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
  closeButton?: boolean;
}) => {
  return toast.error(`${message}`, {
    position,
    description,
    duration,
    closeButton,
  });
};

export const showInfoToast = ({
  message,
  description,
  position = 'top-right',
  duration = 3000,
  closeButton = true,
}: {
  message?: string;
  duration?: number;
  description?: string;
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
  closeButton?: boolean;
}) => {
  return toast.info(`${message}`, {
    position,
    description,
    duration,
    closeButton,
  });
};

export const showLoginPropmt = (props: {
  message?: string;
  duration?: number;
  description?: string;
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
  closeButton?: boolean;
  push?: any;
}) => {
  const {
    message = 'Unauthorized!',
    description = 'You need to be logged in before you can perform this action!',
    position = 'bottom-right',
    duration = 3000,
    closeButton = true,
    push,
  } = props || {};

  return toast(`${message}`, {
    position,
    description,
    duration,
    closeButton,
    action: {
      label: 'Login Now',
      onClick: () => {
        // POST LOGIN REDIRECT
        if (typeof push === 'function') push(`/auth/sign-in?redirectTo=${encodeURIComponent(location.pathname)}`);
      },
    },
  });
};
