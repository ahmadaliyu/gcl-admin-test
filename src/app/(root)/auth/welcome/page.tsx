'use client';
import { Suspense } from 'react';
import React from 'react';
import WelcomePage from '@/components/pages/auth/welcome';

function page() {
  return (
    <Suspense>
      <WelcomePage />
    </Suspense>
  );
}

export default page;
