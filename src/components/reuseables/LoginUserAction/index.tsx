import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

const showLoginPropmt = (props: {
  message?: string;
  duration?: number;
  description?: string;
  position?: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
  closeButton?: boolean;
  push?: any;
}) => {
  const {
    message = 'Unauthorized!',
    description = 'You need to be signed in before you perform this action!',
    position = 'bottom-right',
    duration = 3000,
    closeButton = false,
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

function LoginUserAction({
  children,
  action,
  stopPropagation = false,
  preventDefault = false,
  description = 'You need to be signed in before you perform this action!',
}: {
  children?: React.ReactNode;
  action?: any;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  description?: string;
}) {
  const { accessToken } = useAuthContext();
  const { push } = useRouter();

  return (
    <div>
      {React.Children.map(children, (child?: any) => {
        return React.cloneElement(child, {
          onClick: (e?: any) => {
            if (stopPropagation) e?.stopPropagation?.();
            if (preventDefault) e?.preventDefault?.();

            if (!accessToken) {
              return showLoginPropmt({
                description: description,
                push,
              });
            }
            action?.();
          },
        });
      })}
    </div>
  );
}

export default LoginUserAction;
