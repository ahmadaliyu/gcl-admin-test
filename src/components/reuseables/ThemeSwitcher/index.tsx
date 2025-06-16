'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon } from '@radix-ui/react-icons';

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTheme('light');
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;
  return (
    <>
      <button
        // className="cursor-not-allowed"
        className="cursor-pointer hidden lg:flex"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {resolvedTheme === 'light' ? <img src="/icons/MoonIcon.svg" alt="" className=" w-[20px] h-[20px]" /> : null}
        {resolvedTheme === 'dark' ? <SunIcon className="w-[20px] h-[20px]" /> : null}
      </button>

      <button
        className="lg:hidden relative flex items-center w-16 h-8 border-none outline-none bg-[#E7E7E7]   rounded-full p-1 transition-all duration-300"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <div
          className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            resolvedTheme === 'dark' ? 'translate-x-8' : 'translate-x-0'
          }`}
        ></div>

        <SunIcon
          className={`absolute w-4 h-4${resolvedTheme === 'dark' ? 'text-[#838383]' : 'text-[#111111]'}`}
          style={{
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        <img
          src={resolvedTheme === 'dark' ? '/icons/MoonIcon.svg' : '/icons/inactiveMoon.svg'}
          alt="Moon"
          className={`absolute w-4 h-4 ${resolvedTheme === 'dark' ? 'text-[#FFFFFF]' : 'text-[#838383]'}`}
          style={{
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </button>
    </>
  );
}

export default ThemeSwitcher;
