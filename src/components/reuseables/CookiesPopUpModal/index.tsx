'use client';

import Button from '@/components/reuseables/Button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const ACCEPT_COOKIE_KEY = 'webbie.cookies.permission.accept';

function CookiesPopUpModal() {
  const [show, setShow] = useState(false);

  const open = () => setShow(true);
  const close = () => setShow(false);

  const check = async () => {
    try {
      const value = await localStorage.getItem(ACCEPT_COOKIE_KEY);
      if (value === null) open();
    } catch (error) {}
  };

  const click = async (value: 'accept' | 'reject') => {
    try {
      await localStorage.setItem(ACCEPT_COOKIE_KEY, value);
    } catch (error) {
    } finally {
      close();
    }
  };

  useEffect(() => {
    if (typeof window) {
      setTimeout(() => {
        check();
      }, 1000);
    }
  }, []);

  return (
    <div className={cn('max-screen-wrapper fixed bottom-[50px] right-0', show ? 'block' : 'hidden')}>
      <div className="max-screen-inner flex justify-end">
        <div
          className={
            'rounded-[8px] w-full max-w-[537px] h-fit md:h-[404px] bg-white    p-[32px] flex shadow-2xl darkremove:shadow-cyan-900/30'
          }
        >
          <div className="flex-1 relative flex flex-col gap-[24px] items-center justify-center">
            <img src="/icons/moon-dark.svg" className="w-[60px] h-[60px] darkremove:hidden" />
            <img src="/icons/moon-light.svg" className="w-[60px] h-[60px] hidden darkremove:block" />
            <button className="absolute top-0 right-0" onClick={close}>
              <img src="/icons/close-circle-gray.svg" />
            </button>
            <h3 className="text-center text-[#111111] darkremove:text-[white] font-[500] text-[24px] leading-[32px]">
              Want some cookies?
            </h3>
            <p className="text-center text-[#111111] darkremove:text-[white] font-[400] text-[12px] leading-[20px]">
              Our website requires the use of essential cookies for proper operation. These cookies are vital for
              certain functions, for example, determining the login status of your account. Essential cookies rarely
              collect and use any personal data, though they may assign a unique ID code to distinguish you from other
              users, for session maintenance and to service facilitation. Disabling cookies may impair website
              functionality. If you have any complaint or query about our use of cookies, please contact us at
              contact@webbie.io
            </p>

            <div className="flex gap-[12px]">
              <Button variant="outlined" title="Reject" height="48px" onClick={() => click('reject')} />
              <Button variant="dark" title="Accept" height="48px" onClick={() => click('accept')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiesPopUpModal;
